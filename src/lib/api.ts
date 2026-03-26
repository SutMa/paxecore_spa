import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	adapter: "fetch",
});

let headersAttached = false;

export function attachApiHeaders(
	tenantId: string | number,
	getToken: () => Promise<string | null>,
) {
	if (headersAttached) return;
	headersAttached = true;

	api.interceptors.request.use(async (config) => {
		const token = await getToken();
		if (!token) {
			throw new Error("Missing Clerk token");
		}

		if (!config.headers) config.headers = {} as any;

		(config.headers as any)["X-Tenant-Id"] = String(tenantId);
		(config.headers as any)["Authorization"] = `Bearer ${token}`;

		return config;
	});
}

export function resetApiHeaders() {
	headersAttached = false;
}

export default api;
