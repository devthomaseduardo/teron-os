import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as prisma } from "./prisma-CpXuewPn.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import crypto from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-kaXsGB4n.js
var loginUserFn_createServerFn_handler = createServerRpc({
	id: "1e7399ac961726409e2b89aebb9a4ad7b568ae81140b88344569fbabf0beeab8",
	name: "loginUserFn",
	filename: "src/services/auth.ts"
}, (opts) => loginUserFn.__executeServer(opts));
var loginUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(loginUserFn_createServerFn_handler, async ({ data }) => {
	try {
		const email = data.email.trim().toLowerCase();
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return {
			success: false,
			error: "E-mail ou senha incorretos."
		};
		if (!await bcryptjs_default.compare(data.password, user.passwordHash)) return {
			success: false,
			error: "E-mail ou senha incorretos."
		};
		const token = crypto.randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 720 * 60 * 60 * 1e3);
		await prisma.session.create({ data: {
			token,
			userId: user.id,
			expiresAt
		} });
		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			},
			token
		};
	} catch (err) {
		console.error("[Auth Server] Error logging in:", err);
		return {
			success: false,
			error: "Falha interna ao efetuar login."
		};
	}
});
var registerUserFn_createServerFn_handler = createServerRpc({
	id: "1671ccb79f47d4902512efc4ee15bd5066fe06fd23ccac9eae33d49f986cca98",
	name: "registerUserFn",
	filename: "src/services/auth.ts"
}, (opts) => registerUserFn.__executeServer(opts));
var registerUserFn = createServerFn({ method: "POST" }).validator((data) => data).handler(registerUserFn_createServerFn_handler, async ({ data }) => {
	try {
		const email = data.email.trim().toLowerCase();
		if (await prisma.user.findUnique({ where: { email } })) return {
			success: false,
			error: "Já existe uma conta com este e-mail."
		};
		const passwordHash = await bcryptjs_default.hash(data.password, 10);
		const user = await prisma.user.create({ data: {
			email,
			passwordHash,
			name: data.name || email.split("@")[0],
			role: "admin"
		} });
		const token = crypto.randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 720 * 60 * 60 * 1e3);
		await prisma.session.create({ data: {
			token,
			userId: user.id,
			expiresAt
		} });
		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			},
			token
		};
	} catch (err) {
		console.error("[Auth Server] Error registering user:", err);
		return {
			success: false,
			error: "Falha interna ao criar conta."
		};
	}
});
var verifySessionFn_createServerFn_handler = createServerRpc({
	id: "93c407dcab07e0b4d10e9662c000461e960f7aebf301e7f4c28ac76c5d0ce817",
	name: "verifySessionFn",
	filename: "src/services/auth.ts"
}, (opts) => verifySessionFn.__executeServer(opts));
var verifySessionFn = createServerFn({ method: "GET" }).validator((data) => data).handler(verifySessionFn_createServerFn_handler, async ({ data }) => {
	try {
		if (!data.token) return null;
		const session = await prisma.session.findUnique({
			where: { token: data.token },
			include: { user: true }
		});
		if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
			if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
			return null;
		}
		return {
			id: session.user.id,
			email: session.user.email,
			name: session.user.name,
			role: session.user.role
		};
	} catch (err) {
		console.error("[Auth Server] Error verifying session:", err);
		return null;
	}
});
var logoutFn_createServerFn_handler = createServerRpc({
	id: "c00304768c0b012991436b094541087a9fd31b5291bd9c159b7cd5e9c26e5c93",
	name: "logoutFn",
	filename: "src/services/auth.ts"
}, (opts) => logoutFn.__executeServer(opts));
var logoutFn = createServerFn({ method: "POST" }).validator((data) => data).handler(logoutFn_createServerFn_handler, async ({ data }) => {
	try {
		if (data.token) await prisma.session.delete({ where: { token: data.token } }).catch(() => {});
		return { success: true };
	} catch (err) {
		return { success: false };
	}
});
//#endregion
export { loginUserFn_createServerFn_handler, logoutFn_createServerFn_handler, registerUserFn_createServerFn_handler, verifySessionFn_createServerFn_handler };
