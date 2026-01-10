import type { MyReviewStatus } from "../../../../../domain/change-request";
import { useTheme } from "../../hooks/use-theme";
import { getReviewStatusConfig } from "../../utils/review-status.utils";

type ReviewStatusProps = {
	hasActivity: boolean;
	statusKind: MyReviewStatus;
};

function isApprovedReview(statusKind: MyReviewStatus): boolean {
	return (
		(statusKind.kind === "done" || statusKind.kind === "as_author") &&
		statusKind.decision === "approved"
	);
}

export function ReviewStatus({ hasActivity, statusKind }: ReviewStatusProps) {
	const { theme } = useTheme();
	const config = getReviewStatusConfig(statusKind);

	const showReviewed = hasActivity && isApprovedReview(statusKind);

	return (
		<>
			{showReviewed && (
				<box flexDirection="row" gap={1}>
					<text fg={theme.success}></text>
					<text fg={theme[config.color as keyof typeof theme]}>
						{config.icon}
					</text>
					<text fg={theme.success}>Approved</text>
				</box>
			)}
			{!showReviewed && (
				<box flexDirection="row" gap={1}>
					<text fg={theme[config.color as keyof typeof theme]}>
						{config.icon}
					</text>
					<text fg={theme[config.color as keyof typeof theme]}>
						{config.text}
					</text>
				</box>
			)}
		</>
	);
}
