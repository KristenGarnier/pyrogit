import type { ReactNode } from "react";
import { ToastContainer } from "../molecules/toast-container";

type LayoutProps = {
	children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
}
