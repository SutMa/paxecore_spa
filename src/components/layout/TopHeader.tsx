import {
	Layout,
	Button,
	Typography,
	Segmented,
	theme as antdTheme,
} from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	SunOutlined,
	MoonOutlined,
} from "@ant-design/icons";
import { User } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { appTheme } from "../theme";

const { Header } = Layout;

export default function TopHeader({
	navOpen,
	setNavOpen,
	mode,
	setMode,
}: {
	navOpen: boolean;
	setNavOpen: (value: boolean) => void;
	mode: "light" | "dark";
	setMode: (value: "light" | "dark") => void;
}) {
	const { tenantName } = useAuthStore();
	const { token } = antdTheme.useToken();
	const themeValues = appTheme[mode];

	return (
		<Header
			style={{
				background: token.colorBgLayout,
				paddingInline: 24,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				// borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
				boxShadow: "0 1px 6px rgba(0, 35, 75, 0.15)",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<Button
					type="text"
					icon={navOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
					onClick={() => setNavOpen(!navOpen)}
					style={{ color: token.colorText }}
				/>

				<Typography.Text style={{ color: themeValues.colors.on_surface }}>
					{tenantName ? `${tenantName}` : "No tenant loaded"}
				</Typography.Text>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<Segmented
					value={mode}
					onChange={(val) => setMode(val as "light" | "dark")}
					options={[
						{ value: "light", icon: <SunOutlined /> },
						{ value: "dark", icon: <MoonOutlined /> },
					]}
					size="small"
				/>
				<Button
					type="text"
					onClick={() => {
						// TODO: route to real profile/settings view
						console.log("Open profile/settings");
					}}
					shape="circle"
					style={{
						width: 32,
						height: 32,
						padding: 0,
						borderRadius: "50%",
						background:
							mode === "dark"
								? "rgba(255, 255, 255, 0.14)"
								: "rgba(0, 0, 0, 0.08)",
						color: token.colorText,
						border: "none",
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					icon={<User size={16} />}
				/>
			</div>
		</Header>
	);
}
