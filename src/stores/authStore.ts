import { create } from "zustand";

type AuthSession = {
	tenantId: string | number | null;
	clerkUserId: string | null;
	tenantName: string | null;
	role: string | null;
	isReady: boolean;
};

type AuthStoreActions = {
	setSession: (data: {
		tenantId: string | number;
		clerkUserId: string;
		tenantName: string;
		role: string;
	}) => void;
	clearSession: () => void;
};

export const useAuthStore = create<AuthSession & AuthStoreActions>((set) => ({
	tenantId: null,
	clerkUserId: null,
	tenantName: null,
	role: null,
	isReady: false,

	setSession: (data) =>
		set({
			tenantId: data.tenantId,
			clerkUserId: data.clerkUserId,
			tenantName: data.tenantName,
			role: data.role,
			isReady: true,
		}),

	clearSession: () =>
		set({
			tenantId: null,
			clerkUserId: null,
			tenantName: null,
			role: null,
			isReady: false,
		}),
}));
