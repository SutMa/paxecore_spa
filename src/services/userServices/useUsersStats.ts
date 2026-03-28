import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

interface UsersStats {
	total: number;
	active: number;
	inactive: number;
}

export function useUsersStats() {
	return useQuery<UsersStats>({
		queryKey: ["users", "stats"],
		queryFn: async () => {
			const res = await api.get<UsersStats>("api/users/stats");
			return res.data;
		},
	});
}
