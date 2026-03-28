import UserCard from "../directoryEntities/infoCards/UserStatsCard";

const Directory = () => {
	return (
		<div
			style={{
				height: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: 16,
					width: "100%",
				}}
			>
				<UserCard />
				<UserCard />
				<UserCard />
				<UserCard />
				<UserCard />
			</div>
		</div>
	);
};

export default Directory;
