import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme as antdTheme } from "antd";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const { Content } = Layout;

export default function MainLayout({
	mode,
	setMode,
}: {
	mode: "light" | "dark";
	setMode: (value: "light" | "dark") => void;
}) {
	const [navOpen, setNavOpen] = useState(true);
	const { token } = antdTheme.useToken();

	return (
		<Layout
			style={{
				minHeight: "100vh",
				background: token.colorBgLayout,
				padding: 0,
			}}
		>
			<Sidebar navOpen={navOpen} mode={mode} />

			<Layout>
				<TopHeader
					navOpen={navOpen}
					setNavOpen={setNavOpen}
					mode={mode}
					setMode={setMode}
				/>

				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						background: token.colorBgContainer,
						color: token.colorText,
						borderRadius: 12,
						boxShadow: "0 20px 40px rgba(0, 35, 75, 0.06)",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
