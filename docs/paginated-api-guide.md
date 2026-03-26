# Paginated API Guide for AntD Table

## Request

The frontend sends a POST request with pagination params in the body:

```
POST /api/users/search
Content-Type: application/json

{
  "page": 2,
  "pageSize": 10
}
```

| Field      | Type   | Default | Description             |
| ---------- | ------ | ------- | ----------------------- |
| `page`     | number | 1       | 1-based page number     |
| `pageSize` | number | 10      | Number of rows per page |

## Response

The backend must return:

| Field      | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| `data`     | array  | Rows for the requested page only     |
| `total`    | number | Total row count across all pages     |
| `page`     | number | Current page (echo back the request) |
| `pageSize` | number | Page size (echo back the request)    |

Example response:

```json
{
	"data": [
		{ "id": "u11", "name": "Alice", "email": "alice@co.com", "role": "admin" },
		{ "id": "u12", "name": "Bob", "email": "bob@co.com", "role": "member" }
	],
	"total": 87,
	"page": 2,
	"pageSize": 10
}
```

## Backend Implementation Notes

1. **Query the total count** — run a `COUNT(*)` (or equivalent) for the filtered dataset.
2. **Slice the data** — use `LIMIT` and `OFFSET` (SQL) or `.skip().limit()` (Mongo) to return only the requested page.
   ```
   OFFSET = (page - 1) * pageSize
   LIMIT  = pageSize
   ```
3. **Return both** — the sliced rows in `data` and the full count in `total`. AntD calculates page count from `total / pageSize`.
4. **Edge case** — if `page` exceeds the max, return an empty `data` array with the real `total`. Don't error.

## Frontend Wiring (already set up with TanStack Query)

```tsx
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const { data, isLoading } = useQuery({
	queryKey: ["users", page, pageSize],
	queryFn: () => api.post("/users/search", { page, pageSize }),
});

<Table
	dataSource={data?.data}
	loading={isLoading}
	rowKey="id"
	columns={columns}
	pagination={{
		current: page,
		pageSize: pageSize,
		total: data?.total,
		showSizeChanger: true,
		onChange: (p, ps) => {
			setPage(p);
			setPageSize(ps);
		},
	}}
/>;
```

## Adding Search/Filter/Sort

Extend the same pattern — just add more fields to the request body:

```json
POST /api/users/search

{
  "page": 1,
  "pageSize": 10,
  "search": "alice",
  "sortBy": "name",
  "sortOrder": "asc",
  "filters": {
    "role": "admin"
  }
}
```

The backend filters/sorts first, then paginates, and returns the filtered `total`.
