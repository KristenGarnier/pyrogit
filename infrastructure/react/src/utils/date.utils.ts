import dayjs from "dayjs";

export function isRecent(date: Date) {
	const current = dayjs();
	const target = dayjs(date);
	const daysDiff = Math.abs(current.diff(target, "day"));

	return daysDiff <= 1;
}
