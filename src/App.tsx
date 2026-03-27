import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
} from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { queryClient } from "./lib/queryClient";
import { appTheme, getAntdTokens } from "./theme";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import { useSession } from "./hooks/useSession";
import "./App.css";
import { useAuth } from "@clerk/clerk-react";
import { attachApiHeaders } from "./lib/api";
import Directory from "./pages/Directory";

function SessionGate({ children }: { children: React.ReactNode }) {
	const { isLoading, isError, data } = useSession();
	const { getToken } = useAuth();

	if (isLoading)
		return <div className="fade-text">Setting up your workspace...</div>;
	if (isError)
		return (
			<div className="fade-text">
				Account setup incomplete. Contact support.
			</div>
		);

	if (data?.tenantId) {
		attachApiHeaders(data.tenantId, getToken);
	}

	return <>{children}</>;
}

function AppRoutes({
	mode,
	setMode,
}: {
	mode: "light" | "dark";
	setMode: (value: "light" | "dark") => void;
}) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/sign-in/*" element={<SignInPage />} />
				<Route path="/sign-up/*" element={<SignUpPage />} />
				<Route
					element={
						<>
							<SignedIn>
								<SessionGate>
									<MainLayout mode={mode} setMode={setMode} />
								</SessionGate>
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				>
					<Route index element={<Dashboard />} />

					<Route path="directory" element={<Directory />} />
					<Route path="upload" element={<Dashboard />} />
					<Route path="explorer" element={<Dashboard />} />
					<Route path="routing" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default function App() {
	const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
	const [mode, setMode] = useState<"light" | "dark">(() => {
		const saved = localStorage.getItem("theme");
		if (saved === "light" || saved === "dark") return saved;
		return "light";
	});

	const handleSetMode = (value: "light" | "dark") => {
		localStorage.setItem("theme", value);
		setMode(value);
	};

	const tokens = useMemo(() => getAntdTokens(mode), [mode]);
	const typographyFont = appTheme[mode].fonts.body;

	return (
		<ClerkProvider publishableKey={publishableKey}>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							...tokens,
						},
						components: {
							Typography: {
								fontFamily: typographyFont,
								titleMarginBottom: 0,
							},
						},
					}}
				>
					<AppRoutes mode={mode} setMode={handleSetMode} />
				</ConfigProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
