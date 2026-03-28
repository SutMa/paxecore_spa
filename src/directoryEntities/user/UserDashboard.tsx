import UserDirectoryHeader from "./UserDirectoryHeader";
import UserDirectoryTable from "./UserDirectoryTable";

export default function UserDashboard() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				minHeight: 0,
			}}
		>
			<UserDirectoryHeader />
			<div style={{ flex: 1, minHeight: 0 }}>
				<UserDirectoryTable />
			</div>
		</div>
	);
}
