import { describe, expect, it } from 'vitest';
import c from './chinese-to-number';

describe('chineseToNumber', () => {
  it('should convert Chinese numerals to numbers', () => {
    expect(c('一')).toBe(1);
    expect(c('二')).toBe(2);
    expect(c('三')).toBe(3);
    expect(c('四')).toBe(4);
    expect(c('五')).toBe(5);
    expect(c('六')).toBe(6);
    expect(c('七')).toBe(7);
    expect(c('八')).toBe(8);
    expect(c('九')).toBe(9);
    expect(c('十')).toBe(10);
    expect(c('十五')).toBe(15);
    expect(c('二十')).toBe(20);
    expect(c('三十')).toBe(30);
    expect(c('四十')).toBe(40);
  });
});
