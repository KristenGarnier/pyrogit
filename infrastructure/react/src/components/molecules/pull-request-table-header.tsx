import { catppuccinMochaTheme } from "../../themes/captuccin-mocha";
import type { ColumnKey } from "../../utils/column-width-calculator";

interface PullRequestTableHeaderProps {
	widths: Record<ColumnKey, number>;
}

export function PullRequestTableHeader({
	widths,
}: PullRequestTableHeaderProps) {
	return (
		<box flexDirection="row" gap={1}>
			{/* ID column */}
			<box width={widths.ID}>
				<text fg={catppuccinMochaTheme.muted}>ID</text>
			</box>

			{/* Status column */}
			<box width={widths.Status}>
				<text fg={catppuccinMochaTheme.muted}></text>
			</box>

			{/* Title column */}
			<box width={widths.Title}>
				<text fg={catppuccinMochaTheme.muted}>Title</text>
			</box>

			{/* Author column */}
			<box width={widths.Author}>
				<text fg={catppuccinMochaTheme.muted}>Author</text>
			</box>

			{/* Target column */}
			<box width={widths.Target}>
				<text fg={catppuccinMochaTheme.muted}>Target</text>
			</box>

			{/* Review status column */}
			<box width={widths.Review}>
				<text fg={catppuccinMochaTheme.muted}>Review</text>
			</box>
		</box>
	);
}
