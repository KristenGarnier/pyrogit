import dayjs from "dayjs";

export function isRecent(date: Date) {
	const current = dayjs();
	const target = dayjs(date);
	const hoursDiff = Math.abs(current.diff(target, "hour"));

	return hoursDiff <= 2;
}
