import { Typography } from "antd";

const UserDirectoryHeader = () => {
	return (
		<div>
			<Typography.Title level={2}>Directory</Typography.Title>
			<Typography.Text type="secondary">
				View and Manage people at your organization.
			</Typography.Text>
		</div>
	);
};

export default UserDirectoryHeader;
