import { useState } from "react";
import { Table, Pagination, theme as antdTheme } from "antd";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ColumnsType, TableProps } from "antd/es/table";

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
}

interface PXTableProps<T extends object> {
	/** A React Query hook that accepts (page, pageSize) and returns a UseQueryResult */
	useQuery: (
		page: number,
		pageSize: number,
	) => UseQueryResult<PaginatedResponse<T>>;
	/** AntD column definitions */
	columns: ColumnsType<T>;
	/** Row key field name (default: "id") */
	rowKey?: string | ((record: T) => string);
	/** Initial page size (default: 10) */
	defaultPageSize?: number;
	/** Any additional AntD Table props */
	tableProps?: Omit<
		TableProps<T>,
		"dataSource" | "loading" | "columns" | "pagination" | "rowKey"
	>;
	size?: "small" | "medium" | "large";
}

export default function PXTable<T extends object>({
	useQuery: useQueryHook,
	columns,
	rowKey = "id",
	defaultPageSize = 10,
	tableProps,
	size = "medium",
}: PXTableProps<T>) {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(defaultPageSize);
	const { token } = antdTheme.useToken();

	const { data, isLoading } = useQueryHook(page, pageSize);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				border: `1px solid ${token.colorBorderSecondary}`,
				borderRadius: token.borderRadius,
				overflow: "hidden",
			}}
		>
			<Table<T>
				dataSource={data?.data}
				loading={isLoading}
				columns={columns}
				rowKey={rowKey}
				pagination={false}
				{...tableProps}
				size={size}
				style={{ flex: 1, overflow: "auto", ...tableProps?.style }}
			/>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "16px 16px",
				}}
			>
				<Pagination
					current={page}
					pageSize={pageSize}
					total={data?.total}
					showSizeChanger
					onChange={(p, ps) => {
						setPage(p);
						setPageSize(ps);
					}}
				/>
			</div>
		</div>
	);
}
