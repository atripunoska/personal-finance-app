import { generatePagination, cn, USDollar } from '@/lib/utils';

describe('generatePagination', () => {
  // --- Total pages <= 7: show all pages ---
  it('returns all pages when totalPages <= 7', () => {
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns [1] for a single page', () => {
    expect(generatePagination(1, 1)).toEqual([1]);
  });

  // --- Current page near the beginning ---
  it('shows first 3 + ellipsis + last 2 when currentPage <= 3', () => {
    expect(generatePagination(1, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    expect(generatePagination(3, 10)).toEqual([1, 2, 3, '...', 9, 10]);
  });

  // --- Current page near the end ---
  it('shows first 2 + ellipsis + last 3 when currentPage >= totalPages - 2', () => {
    expect(generatePagination(8, 10)).toEqual([1, 2, '...', 8, 9, 10]);
    expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10]);
  });

  // --- Current page in the middle ---
  it('shows first + ellipsis + neighbors + ellipsis + last when in middle', () => {
    expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    expect(generatePagination(6, 12)).toEqual([1, '...', 5, 6, 7, '...', 12]);
  });

  // --- Edge cases ---
  it('handles totalPages = 0 (returns empty array)', () => {
    expect(generatePagination(1, 0)).toEqual([]);
  });

  it('handles boundary between "near start" and "middle" (page 4 of 10)', () => {
    // currentPage=4 is NOT <= 3 and NOT >= 10-2=8, so it's "middle"
    expect(generatePagination(4, 10)).toEqual([1, '...', 3, 4, 5, '...', 10]);
  });

  it('handles exactly 8 pages (first case above 7)', () => {
    expect(generatePagination(1, 8)).toEqual([1, 2, 3, '...', 7, 8]);
    expect(generatePagination(4, 8)).toEqual([1, '...', 3, 4, 5, '...', 8]);
    expect(generatePagination(7, 8)).toEqual([1, 2, '...', 6, 7, 8]);
  });
});

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra');
  });
});

describe('USDollar', () => {
  it('formats a number as USD currency', () => {
    expect(USDollar.format(1234.5)).toBe('$1,234.50');
  });

  it('formats zero', () => {
    expect(USDollar.format(0)).toBe('$0.00');
  });

  it('formats negative values', () => {
    expect(USDollar.format(-99.99)).toBe('-$99.99');
  });
});
