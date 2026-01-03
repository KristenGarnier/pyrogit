import { describe, expect, it } from "bun:test";
import { calculateScrollPosition } from "../infrastructure/react/src/hooks/use-auto-scroll";

describe("calculateScrollPosition", () => {
	it("should return 0 if index is below low bound", () => {
		expect(calculateScrollPosition(20, 0, 10)).toBe(0);
		expect(calculateScrollPosition(20, 7, 10)).toBe(0); // lowBound = 8
	});

	it("should return totalItems if index is above high bound", () => {
		expect(calculateScrollPosition(20, 9, 10)).toBe(10); // highBound = 2, 9 > 2
		expect(calculateScrollPosition(20, 8, 10)).toBe(10); // 8 > 2
	});

	it("should return 0 if index is below low bound", () => {
		expect(calculateScrollPosition(20, 3, 10)).toBe(0); // 3 < 8
		expect(calculateScrollPosition(20, 5, 10)).toBe(0); // 5 < 8
	});

	it("should handle custom options", () => {
		expect(
			calculateScrollPosition(20, 2, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(0); // lowBound=4, 2<4, 0
		expect(
			calculateScrollPosition(20, 5, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(1); // 4<5, 5-4=1
		expect(
			calculateScrollPosition(20, 7, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(10); // 7>6, 10
	});

	it("should handle custom options", () => {
		expect(
			calculateScrollPosition(20, 2, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(0); // lowBound=4, 2<4, 0
		expect(
			calculateScrollPosition(20, 5, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(1); // 4<5, 5-4=1
		expect(
			calculateScrollPosition(20, 7, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(10); // 7>6, 10
	});

	it("should handle custom options", () => {
		expect(
			calculateScrollPosition(20, 2, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(0); // lowBound=4, 2<4, 0
		expect(
			calculateScrollPosition(20, 5, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(1); // 4<5, 5-4=1
		expect(
			calculateScrollPosition(20, 7, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(10); // 7>6, 10
	});

	it("should handle custom options", () => {
		expect(
			calculateScrollPosition(20, 2, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(0); // lowBound=4, 2<4, 0
		expect(
			calculateScrollPosition(20, 5, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(1); // 4<5, 5-4=1
		expect(
			calculateScrollPosition(20, 7, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(10); // 7>6, 10
	});

	it("should handle custom options", () => {
		expect(
			calculateScrollPosition(20, 2, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(0); // lowBound=4, 2<4, 0
		expect(
			calculateScrollPosition(20, 5, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(1); // 4<5, 5-4=1
		expect(
			calculateScrollPosition(20, 7, 10, { itemHeight: 2, overhead: 2 }),
		).toBe(10); // 7>6, 10
	});
});

