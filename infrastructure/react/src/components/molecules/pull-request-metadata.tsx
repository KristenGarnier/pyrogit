type PullRequestMetadataProps = {
	number: number;
	author: string;
	target: string;
};

export function PullRequestMetadata({
	number,
	author,
	target,
}: PullRequestMetadataProps) {
	return (
		<>
			<box flexDirection="row">
				<text fg={"red"}>*</text>
				<text>{number}</text>
			</box>
			<text>{author}</text>
			<text>{target}</text>
		</>
	);
}
