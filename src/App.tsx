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

function SessionGate({ children }: { children: React.ReactNode }) {
	const { isLoading, isError } = useSession();

	if (isLoading)
		return <div className="fade-text">Setting up your workspace...</div>;
	if (isError)
		return (
			<div className="fade-text">
				Account setup incomplete. Contact support.
			</div>
		);

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

					<Route path="members" element={<Dashboard />} />
					<Route path="settings" element={<Dashboard />} />
					<Route path="usage" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default function App() {
	const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
	const [mode, setMode] = useState<"light" | "dark">(() => {
		if (typeof window !== "undefined" && window.matchMedia) {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return "light";
	});

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
							},
						},
					}}
				>
					<AppRoutes mode={mode} setMode={setMode} />
				</ConfigProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
