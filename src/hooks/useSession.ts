import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { attachApiHeaders } from "../lib/api";
import { useAuthStore } from "../stores/authStore";

async function fetchSession(getToken: () => Promise<string | null>) {
	const token = await getToken();
	if (!token) {
		throw new Error("Missing Clerk token");
	}

	const res = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/auth/session`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!res.ok) {
		throw new Error(`Session error: ${res.status}`);
	}

	return res.json();
}

export function useSession() {
	const { getToken, isSignedIn } = useAuth();
	const setSession = useAuthStore((s) => s.setSession);

	const query = useQuery({
		queryKey: ["session"],
		queryFn: () => fetchSession(getToken),
		enabled: !!isSignedIn,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	useEffect(() => {
		if (query.data) {
			setSession(query.data);
			attachApiHeaders(query.data.tenantId, getToken);
		}
	}, [query.data, getToken, setSession]);

	return query;
}
