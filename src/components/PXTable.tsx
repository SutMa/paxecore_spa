import { useState } from "react";
import { Table, Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";
import type { ColumnsType, TableProps } from "antd/es/table";
import api from "../lib/api";

interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
}

interface PXTableProps<T extends object> {
	/** Unique key for TanStack Query caching */
	queryKey: string;
	/** POST endpoint path, e.g. "/users/search" */
	endpoint: string;
	/** AntD column definitions */
	columns: ColumnsType<T>;
	/** Row key field name (default: "id") */
	rowKey?: string | ((record: T) => string);
	/** Extra body params to send with every request (filters, search, sort, etc.) */
	body?: Record<string, unknown>;
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
	queryKey,
	endpoint,
	columns,
	rowKey = "id",
	body = {},
	defaultPageSize = 10,
	tableProps,
	size = "medium",
}: PXTableProps<T>) {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(defaultPageSize);

	const { data, isLoading } = useQuery<PaginatedResponse<T>>({
		queryKey: [queryKey, page, pageSize, body],
		queryFn: async () => {
			const res = await api.post<PaginatedResponse<T>>(endpoint, {
				page,
				pageSize,
				...body,
			});
			return res.data;
		},
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				border: "1px solid #e8e8e8",
				borderRadius: 8,
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
