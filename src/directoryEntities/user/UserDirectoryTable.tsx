import type { ColumnsType } from "antd/es/table";
import PXTable from "../../components/core/PXTable";
import { useUsersSearch } from "../../services/userServices/useUsersSearch";

interface User {
	id: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	title?: string;
	role?: string;
	active?: boolean;
}

const columns: ColumnsType<User> = [
	{
		title: "Name",
		key: "name",
		render: (_, record) =>
			`${record.firstName ?? ""} ${record.lastName ?? ""}`.trim(),
	},
	{ title: "Email", dataIndex: "email", key: "email" },
	{ title: "Title", dataIndex: "title", key: "title" },
	{ title: "Role", dataIndex: "role", key: "role" },
	{
		title: "Status",
		key: "active",
		render: (_, record) =>
			record.active ? (
				<span style={{ color: "#52c41a" }}>Active</span>
			) : (
				<span style={{ color: "#ff4d4f" }}>Inactive</span>
			),
	},
];

export default function UserDirectoryTable() {
	return (
		<PXTable
			useQuery={useUsersSearch}
			columns={columns}
			size="small"
			tableProps={{ bordered: false }}
		/>
	);
}
