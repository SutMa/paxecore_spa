import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { appTheme } from "../theme";
import MainLayout from "../components/MainLayout";
import { Typography } from "antd";

export default function Dashboard({
	mode,
	setMode,
}: {
	mode: "light" | "dark";
	setMode: (value: "light" | "dark") => void;
}) {
	const { tenantName, role, clerkUserId } = useAuthStore();
	const [navOpen, setNavOpen] = useState(true);
	const themeValues = appTheme[mode];

	return (
		<MainLayout
			navOpen={navOpen}
			setNavOpen={setNavOpen}
			mode={mode}
			setMode={setMode}
		>
			<Typography.Title
				level={2}
				style={{ fontFamily: themeValues.fonts.heading }}
			>
				Welcome, {tenantName || "User"}
			</Typography.Title>
			<Typography.Paragraph>Role: {role || "unknown"}</Typography.Paragraph>
			<Typography.Paragraph>
				User ID: {clerkUserId || "unknown"}
			</Typography.Paragraph>
			<Typography.Paragraph>
				This layout now uses Ant Design with top header and collapsible side
				nav, following the Precision Vault surface hierarchy.
			</Typography.Paragraph>
		</MainLayout>
	);
}
