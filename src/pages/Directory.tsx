import DirectoryBody from "../directoryEntities/DirectoryBody";
import DirectoryHeader from "../directoryEntities/DirectoryHeader";

const Directory = () => {
	return (
		<div
			style={{
				height: "100%",
			}}
		>
			<DirectoryHeader />
			<div
				style={{
					height: "95%",
				}}
			>
				<DirectoryBody />
			</div>
		</div>
	);
};

export default Directory;
