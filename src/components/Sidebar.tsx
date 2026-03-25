import { Layout, Menu } from "antd";
import {
	HomeOutlined,
	TeamOutlined,
	SettingOutlined,
	BarChartOutlined,
} from "@ant-design/icons";
import { appTheme } from "../theme";
import PaxecoreIcon from "./PaxecoreIcon";

const { Sider } = Layout;

export default function Sidebar({
	navOpen,
	mode,
}: {
	navOpen: boolean;
	mode: "light" | "dark";
}) {
	const themeValues = appTheme[mode];

	const navItems = [
		{ key: "overview", icon: <HomeOutlined />, label: "Overview" },
		{ key: "members", icon: <TeamOutlined />, label: "Members" },
		{ key: "settings", icon: <SettingOutlined />, label: "Settings" },
		{ key: "usage", icon: <BarChartOutlined />, label: "Usage" },
	];

	return (
		<Sider
			collapsible
			collapsed={!navOpen}
			trigger={null}
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
					margin: 16,
					color: themeValues.colors.on_surface,
					fontWeight: "bold",
					textAlign: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 8,
					overflow: "hidden",
					// No transition
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
				defaultSelectedKeys={["overview"]}
				items={navItems}
				style={{
					background: "transparent",
					border: "none",
					color: themeValues.colors.on_surface,
				}}
			/>
		</Sider>
	);
}
