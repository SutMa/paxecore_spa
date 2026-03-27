export const appTheme = {
	light: {
		colors: {
			primary: "#007bff",
			secondary: "#6c757d",
			tertiary: "#28a745",
			neutral: "#6c757d",
			background: "#ffffff",
			surface: "#f8f9fa",
			on_background: "#212529",
			on_surface: "#212529",
			on_primary: "#ffffff",
			on_secondary: "#ffffff",
		},
		fonts: {
			heading: "Manrope, 'Segoe UI', Roboto, sans-serif",
			body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
			label:
				"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
		},
	},
	dark: {
		colors: {
			primary: "#007bff",
			secondary: "#6c757d",
			tertiary: "#28a745",
			neutral: "#adb5bd",
			background: "#000000",
			surface: "#0a0a0a",
			on_background: "#f8f9fa",
			on_surface: "#f8f9fa",
			on_primary: "#ffffff",
			on_secondary: "#ffffff",
		},
		fonts: {
			heading: "Manrope, 'Segoe UI', Roboto, sans-serif",
			body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
			label:
				"Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
		},
	},
};

export const spacing = {
	"spacing-2": "0.7rem",
	"spacing-4": "1.4rem",
	"spacing-6": "2rem",
	"spacing-16": "5.5rem",
};

export const getAntdTokens = (mode: "light" | "dark") => {
	const themeMode = appTheme[mode];
	const isDark = mode === "dark";

	return {
		colorPrimary: themeMode.colors.primary,
		colorSecondary: themeMode.colors.secondary,
		colorSuccess: themeMode.colors.tertiary,
		colorText: themeMode.colors.on_background,
		colorTextSecondary: isDark ? "#ffffff" : themeMode.colors.neutral,
		colorTextDescription: isDark ? "#ffffff" : themeMode.colors.neutral,
		colorTextLabel: isDark ? "#ffffff" : themeMode.colors.neutral,
		colorTextTertiary: isDark ? "#ffffff" : themeMode.colors.neutral,
		colorTextQuaternary: isDark ? "#ffffff" : themeMode.colors.neutral,
		colorBgBase: themeMode.colors.background,
		colorBgLayout: themeMode.colors.background,
		colorBgContainer: themeMode.colors.surface,
		colorBgElevated: themeMode.colors.surface,
		colorBorder: "rgba(0,0,0,0)",
		colorBorderSecondary: isDark
			? "rgba(255, 255, 255, 0.25)"
			: "rgba(204, 203, 200, 0.8)", // surface_border at softer opacity
		colorError: "#F43F5E",
		colorWarning: "#F59E0B",
		fontFamily: themeMode.fonts.body,
		borderRadius: 0,
		lineHeight: 1.5,
		boxShadow: isDark
			? "0 8px 24px rgba(0, 0, 0, 0.5)"
			: "0 4px 16px rgba(29, 28, 28, 0.06), 0 1px 3px rgba(0, 102, 140, 0.08)",
	};
};
