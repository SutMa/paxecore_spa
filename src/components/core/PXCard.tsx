import type { CSSProperties, ReactNode } from "react";
import { theme as antdTheme } from "antd";
import { useNavigate } from "react-router-dom";

interface PXCardProps {
	children: ReactNode;
	/** Route to navigate to on click */
	to?: string;
	/** Card width (CSS value) */
	width?: CSSProperties["width"];
	/** Card height (CSS value) */
	height?: CSSProperties["height"];
	/** Additional inline styles */
	style?: CSSProperties;
}

export default function PXCard({
	children,
	to,
	width,
	height,
	style,
}: PXCardProps) {
	const { token } = antdTheme.useToken();
	const navigate = useNavigate();

	return (
		<div
			onClick={to ? () => navigate(to) : undefined}
			style={{
				backgroundColor: token.colorBgContainer,
				padding: "1.5rem",
				borderRadius: token.borderRadius,
				border: `1px solid ${token.colorBorderSecondary}`,
				transition: "transform 0.2s, box-shadow 0.2s",
				cursor: to ? "pointer" : "default",
				width,
				height,
				...style,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "translateY(-2px)";
				e.currentTarget.style.boxShadow = token.boxShadow;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "translateY(0)";
				e.currentTarget.style.boxShadow = "none";
			}}
		>
			{children}
		</div>
	);
}
