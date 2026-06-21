describe('Contains Duplicate', () => {

    function containsDuplicate(nums: number[]): boolean {
        const seen = new Set<number>();
        for (const num of nums) {
            if (seen.has(num)) return true;
            seen.add(num);
        }
        return false;
    }

    it('trả về true khi có giá trị xuất hiện nhiều hơn 1 lần', () => {
        expect(containsDuplicate([1, 2, 3, 3])).toBe(true);
    });

    it('trả về false khi tất cả giá trị đều khác nhau', () => {
        expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
    });

    it('trả về false khi mảng rỗng', () => {
        expect(containsDuplicate([])).toBe(false);
    });

    it('trả về true khi có số âm trùng nhau', () => {
        expect(containsDuplicate([-1, -2, -1])).toBe(true);
    });

    it('trả về true khi giá trị biên (-10^9 và 10^9) bị trùng', () => {
        expect(containsDuplicate([-1_000_000_000, 5, 1_000_000_000, -1_000_000_000])).toBe(true);
    });

    it('trả về false khi giá trị biên (-10^9 và 10^9) không trùng', () => {
        expect(containsDuplicate([-1_000_000_000, 1_000_000_000])).toBe(false);
    });

    it('xử lý đúng và đủ nhanh với mảng 10^5 phần tử (không trùng)', () => {
        const big = Array.from({ length: 100_000 }, (_, i) => i);
        expect(containsDuplicate(big)).toBe(false);
    });

    it('xử lý đúng với mảng 10^5 phần tử có 1 cặp trùng ở cuối', () => {
        const big = Array.from({ length: 100_000 }, (_, i) => i);
        big[99_999] = big[0]; // tạo trùng giữa phần tử đầu và cuối
        expect(containsDuplicate(big)).toBe(true);
    });
});
