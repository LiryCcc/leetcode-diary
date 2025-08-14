import { describe, expect, it } from 'vitest';
import checkPowersOfThree from './1780';

describe('1780', () => {
  it('官方case1', () => {
    expect(checkPowersOfThree(12)).toBe(true);
  });
  it('官方case2', () => {
    expect(checkPowersOfThree(91)).toBe(true);
  });
  it('官方case3', () => {
    expect(checkPowersOfThree(21)).toBe(false);
  });
  it('自定义1', () => {
    expect(checkPowersOfThree(4)).toBe(true);
  });
});
