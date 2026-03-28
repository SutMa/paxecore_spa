import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import type { PaginatedResponse } from "../../components/PXTable";

interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	title?: string;
	role?: string;
	active?: boolean;
}

export function useUsersSearch(page: number, pageSize: number) {
	return useQuery<PaginatedResponse<User>>({
		queryKey: ["users", page, pageSize],
		queryFn: async () => {
			const res = await api.post<PaginatedResponse<User>>("api/users/search", {
				page,
				pageSize,
			});
			return res.data;
		},
	});
}
