# Adding New Pages

The app uses a shared layout (sidebar + top bar) that persists across all authenticated pages. New pages render inside the layout's content area via React Router's `<Outlet />`.

## Steps

### 1. Create the page component

Add a new file in `src/pages/`. The component receives no layout props — just return your page content directly.

```tsx
// src/pages/Members.tsx
import { Typography } from "antd";

export default function Members() {
	return (
		<>
			<Typography.Title level={2}>Members</Typography.Title>
			<Typography.Paragraph>
				Manage your team members here.
			</Typography.Paragraph>
		</>
	);
}
```

### 2. Add the route in `App.tsx`

Import your page and add a `<Route>` inside the layout route's children:

```tsx
// src/App.tsx
import Members from "./pages/Members";

// Inside the layout <Route> block:
<Route index element={<Dashboard />} />
<Route path="members" element={<Members />} />
```

The layout route (which renders `MainLayout`) already wraps all child routes with the sidebar and top bar — no need to import or render those in your page.

### 3. Add a sidebar nav item (if needed)

In `src/components/Sidebar.tsx`, add an entry to the `navItems` array. The `key` must match the route path:

```tsx
const navItems = [
	{ key: "/", icon: <HomeOutlined />, label: "Overview" },
	{ key: "/members", icon: <TeamOutlined />, label: "Members" },
	{ key: "/settings", icon: <SettingOutlined />, label: "Settings" },
	{ key: "/usage", icon: <BarChartOutlined />, label: "Usage" },
];
```

The sidebar uses `useLocation().pathname` to highlight the active item and `useNavigate()` to handle clicks — no additional wiring needed.

## File summary

| File                         | What to do                              |
| ---------------------------- | --------------------------------------- |
| `src/pages/YourPage.tsx`     | Create — just export your page content  |
| `src/App.tsx`                | Add a `<Route>` inside the layout route |
| `src/components/Sidebar.tsx` | Add a nav item to `navItems` (optional) |
