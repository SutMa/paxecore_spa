import { Layout, Menu } from "antd";
import {
	HomeOutlined,
	TeamOutlined,
	SettingOutlined,
	BarChartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { appTheme } from "../theme";
import PaxecoreIcon from "./PaxecoreIcon";
import { LayoutDashboard } from "lucide-react";
import { Users } from "lucide-react";
import { FolderOpen } from "lucide-react";
import { Route } from "lucide-react";
import { Send } from "lucide-react";
import { Focus } from "lucide-react";

const { Sider } = Layout;

export default function Sidebar({
	navOpen,
	mode,
}: {
	navOpen: boolean;
	mode: "light" | "dark";
}) {
	const navigate = useNavigate();
	const location = useLocation();
	const themeValues = appTheme[mode];

	const navItems = [
		{ key: "/", icon: <LayoutDashboard size={22} />, label: "Dashboard" },
		{ key: "/upload", icon: <Focus size={22} />, label: "Upload" },
		{ key: "/explorer", icon: <FolderOpen size={22} />, label: "Explorer" },
		{ key: "/directory", icon: <Users size={22} />, label: "Directory" },
		{ key: "/routing", icon: <Send size={22} />, label: "Routing" },
	];

	return (
		<Sider
			collapsible
			collapsed={!navOpen}
			trigger={null}
			width={260}
			collapsedWidth={80}
			style={{
				background: themeValues.colors.surface,
				color: themeValues.colors.on_surface,
				boxShadow: "none",
				borderRadius: 0,
				margin: 0,
				minHeight: "100vh",
				transition: "all 0.3s ease",
			}}
		>
			<div
				style={{
					height: 64,
					margin: "0 16px",
					color: themeValues.colors.on_surface,
					fontWeight: "bold",
					textAlign: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 8,
					overflow: "hidden",
				}}
			>
				<PaxecoreIcon />
				<span
					style={{
						letterSpacing: 2,
						fontFamily: themeValues.fonts.heading,
						fontSize: 22,
						color: themeValues.colors.on_surface,
						fontWeight: 700,
						lineHeight: 1.1,
						width: navOpen ? 140 : 0,
						minWidth: navOpen ? 140 : 0,
						opacity: navOpen ? 1 : 0,
						// No transition
						whiteSpace: "nowrap",
						overflow: "hidden",
						display: "inline-block",
						textAlign: "left",
					}}
				>
					PAXECORE
				</span>
			</div>
			<Menu
				theme={themeValues.colors.background === "#ffffff" ? "light" : "dark"}
				mode="inline"
				selectedKeys={[location.pathname]}
				items={navItems}
				onClick={({ key }) => navigate(key)}
				style={{
					background: "transparent",
					border: "none",
					color: themeValues.colors.on_surface,
				}}
			/>
		</Sider>
	);
}
