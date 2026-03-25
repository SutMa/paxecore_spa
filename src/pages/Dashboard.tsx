import { useAuthStore } from "../stores/authStore";
import { Typography } from "antd";

export default function Dashboard() {
	const { tenantName, role, clerkUserId } = useAuthStore();

	return (
		<>
			<Typography.Title level={2}>
				Welcome, {tenantName || "User"}
			</Typography.Title>
			<Typography.Paragraph>Role: {role || "unknown"}</Typography.Paragraph>
			<Typography.Paragraph>
				User ID: {clerkUserId || "unknown"}
			</Typography.Paragraph>
		</>
	);
}
