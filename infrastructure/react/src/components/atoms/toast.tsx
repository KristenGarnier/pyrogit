import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";

type ToastType = "info" | "success" | "warning" | "error";

type ToastProps = {
	message: string;
	type?: ToastType;
};

const typeColors = {
	info: catppuccinMochaTheme.info,
	success: catppuccinMochaTheme.success,
	warning: catppuccinMochaTheme.warning,
	error: catppuccinMochaTheme.error,
};

export function Toast({ message, type = "info" }: ToastProps) {
	return (
		<box
			backgroundColor={catppuccinMochaTheme.highlightBg}
			paddingRight={1}
			gap={1}
			flexDirection="row"
		>
			<box width={1} backgroundColor={typeColors[type]}></box>
			<text>{message}</text>
		</box>
	);
}
