type StatusIconProps = {
	status: "open" | "closed" | "merged";
};

export function StatusIcon({ status }: StatusIconProps) {
	const icon = status === "open" ? "" : status === "closed" ? "" : "";
	const color =
		status === "open" ? "cyan" : status === "closed" ? "red" : "magenta";

	return <text fg={color}>{icon}</text>;
}
