import { Typography, Spin, Button, Tooltip, theme as antdTheme } from "antd";
import { useUsersStats } from "../../services/userServices/useUsersStats";
import { Users, UserCheck, UserX, UserPlus, Eye } from "lucide-react";
import PXCard from "../../components/core/PXCard";
import { useNavigate } from "react-router-dom";

const UserStatsCard = () => {
	const { token } = antdTheme.useToken();
	const navigate = useNavigate();
	const { data, isLoading } = useUsersStats();

	if (isLoading) {
		return (
			<PXCard
				width="15rem"
				height="16rem"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spin />
			</PXCard>
		);
	}

	const total = data?.total ?? 0;
	const active = data?.active ?? 0;
	const inactive = data?.inactive ?? 0;

	return (
		<PXCard to="/directory/users" width="15rem">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography.Title level={5}>Users</Typography.Title>
					<div style={{ display: "flex", gap: 4 }}>
						<Tooltip title="Add New User">
							<Button
								size="middle"
								icon={<UserPlus size={16} />}
								style={{ minWidth: 40, height: 30 }}
								onClick={(e) => {
									e.stopPropagation();
									navigate("/directory/users/new");
								}}
							/>
						</Tooltip>
						<Tooltip title="View All Users">
							<Button
								size="middle"
								icon={<Eye size={16} />}
								style={{ minWidth: 40, height: 30 }}
								onClick={(e) => {
									e.stopPropagation();
									navigate("/directory/users");
								}}
							/>
						</Tooltip>
					</div>
				</div>

				<div
					style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
				>
					<StatRow
						icon={<Users size={18} color={token.colorPrimary} />}
						label="Total Users"
						value={total}
						color={token.colorPrimary}
						token={token}
					/>
					<StatRow
						icon={<UserCheck size={18} color="#52c41a" />}
						label="Active"
						value={active}
						color="#52c41a"
						token={token}
					/>
					<StatRow
						icon={<UserX size={18} color="#ff4d4f" />}
						label="Inactive"
						value={inactive}
						color="#ff4d4f"
						token={token}
					/>
				</div>
			</div>
		</PXCard>
	);
};

function StatRow({
	icon,
	label,
	value,
	color,
	token,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	color: string;
	token: ReturnType<typeof antdTheme.useToken>["token"];
}) {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
			{icon}
			<span
				style={{
					fontSize: 14,
					color: token.colorTextSecondary,
					fontFamily: token.fontFamily,
				}}
			>
				{label}
			</span>
			<span
				style={{
					marginLeft: "auto",
					fontSize: 16,
					fontWeight: 600,
					color,
					fontFamily: token.fontFamily,
					letterSpacing: "-0.02em",
				}}
			>
				{value.toLocaleString()}
			</span>
		</div>
	);
}

export default UserStatsCard;
