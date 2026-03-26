import { Typography } from "antd";

const DirectoryHeader = () => {
	return (
		<div>
			<Typography.Title level={2}>Directory</Typography.Title>
			<Typography.Text type="secondary">
				View and Manage people at your organization.
			</Typography.Text>
		</div>
	);
};

export default DirectoryHeader;
