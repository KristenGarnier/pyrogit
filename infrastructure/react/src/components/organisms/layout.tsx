import type { ReactNode } from "react";
import { ToastContainer } from "../molecules/toast-container";
import { useThemeStore } from "../../stores/theme.store";

type LayoutProps = {
	children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
	const { currentTheme } = useThemeStore();
	return (
		<box backgroundColor={currentTheme.background}>
			{children}
			<ToastContainer />
		</box>
	);
}
