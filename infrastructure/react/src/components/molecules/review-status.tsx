type ReviewStatusProps = {
	hasActivity: boolean;
	statusKind: string;
};

export function ReviewStatus({ hasActivity, statusKind }: ReviewStatusProps) {
	const activityIcon = hasActivity ? "" : "󰚭";

	return (
		<>
			<text fg={"orange"}>{activityIcon}</text>
			<text fg={"yellow"}>{statusKind}</text>
		</>
	);
}
