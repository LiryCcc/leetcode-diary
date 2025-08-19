import { describe, expect, it } from 'vitest';
import versionCompare from './semver-compare';

describe('semver compare', () => {
  // --- 基本功能测试 ---
  it('应该返回 0 当版本号相等时', () => {
    expect(versionCompare('1.0.0', '1.0.0')).toBe(0);
    expect(versionCompare('5.2.1', '5.2.1')).toBe(0);
    expect(versionCompare('0.0.0', '0.0.0')).toBe(0);
  });

  it('应该返回 1 当 semver1 大于 semver2 (主版本)', () => {
    expect(versionCompare('2.0.0', '1.0.0')).toBe(1);
  });

  it('应该返回 -1 当 semver1 小于 semver2 (主版本)', () => {
    expect(versionCompare('1.0.0', '2.0.0')).toBe(-1);
  });

  it('应该返回 1 当 semver1 大于 semver2 (次版本)', () => {
    expect(versionCompare('1.1.0', '1.0.0')).toBe(1);
    expect(versionCompare('1.10.0', '1.9.0')).toBe(1); // 数字比较
  });

  it('应该返回 -1 当 semver1 小于 semver2 (次版本)', () => {
    expect(versionCompare('1.0.0', '1.1.0')).toBe(-1);
    expect(versionCompare('1.9.0', '1.10.0')).toBe(-1); // 数字比较
  });

  it('应该返回 1 当 semver1 大于 semver2 (修订版本)', () => {
    expect(versionCompare('1.0.1', '1.0.0')).toBe(1);
    expect(versionCompare('1.0.10', '1.0.9')).toBe(1); // 数字比较
  });

  it('应该返回 -1 当 semver1 小于 semver2 (修订版本)', () => {
    expect(versionCompare('1.0.0', '1.0.1')).toBe(-1);
    expect(versionCompare('1.0.9', '1.0.10')).toBe(-1); // 数字比较
  });

  // --- 不同长度版本号的测试 (补零行为) ---
  it('应该正确处理不同长度的版本号（短版本号被补零）', () => {
    expect(versionCompare('1.0', '1.0.0')).toBe(0);
    expect(versionCompare('1', '1.0.0')).toBe(0);
    expect(versionCompare('1.2', '1.2.0')).toBe(0);
    expect(versionCompare('1.0.1', '1.0')).toBe(1); // 1.0.1 vs 1.0.0
    expect(versionCompare('1.0', '1.0.1')).toBe(-1); // 1.0.0 vs 1.0.1
    expect(versionCompare('2.0', '1.9.9')).toBe(1); // 2.0.0 vs 1.9.9
  });

  // --- 规范化输入测试 ---
  it('应该忽略版本号前的 "v" 前缀', () => {
    expect(versionCompare('v1.0.0', '1.0.0')).toBe(0);
    expect(versionCompare('1.0.0', 'v1.0.0')).toBe(0);
    expect(versionCompare('v1.0.1', 'v1.0.0')).toBe(1);
  });

  it('应该忽略版本号前后的空格', () => {
    expect(versionCompare(' 1.0.0 ', '1.0.0')).toBe(0);
    expect(versionCompare('1.0.0', ' 1.0.0 ')).toBe(0);
    expect(versionCompare(' 2.0.0 ', '1.9.9')).toBe(1);
  });

  it('应该处理混合格式的输入', () => {
    expect(versionCompare('v1.5', '1.5.0')).toBe(0);
    expect(versionCompare(' 2.1.0 ', 'v2.0.9')).toBe(1);
  });

  // --- SemVer 规范处理缺陷的测试 ---
  // describe('SemVer 规范处理缺陷', () => {
  //   it('NOTE: 不应正确处理预发布版本号 (例如 -alpha, -beta)', () => {
  //     // 按照 SemVer 规范：1.0.0-alpha < 1.0.0
  //     // 但此函数会因为 "0-alpha" 转换为 NaN 而将它们视为相等（通常）
  //     expect(versionCompare('1.0.0-alpha', '1.0.0')).toBe(0);
  //     expect(versionCompare('1.0.0', '1.0.0-beta')).toBe(0);
  //     expect(versionCompare('1.0.0-alpha', '1.0.0-beta')).toBe(0); // 实际应根据字母顺序比较
  //   });

  //   it('NOTE: 不应正确处理构建元数据 (例如 +build.123)', () => {
  //     // 按照 SemVer 规范：1.0.0+build.123 == 1.0.0
  //     // 但此函数会因为 "+build" 转换为 NaN 而将它们视为相等
  //     expect(versionCompare('1.0.0+build.123', '1.0.0')).toBe(0);
  //     expect(versionCompare('1.0.0', '1.0.0+abc.xyz')).toBe(0);
  //   });

  //   it('NOTE: 处理非数字段时可能产生非预期结果（依赖 NaN 比较行为）', () => {
  //     // Number('abc') 会得到 NaN
  //     // NaN 与任何值的比较（>, <, ==）都为 false，除了 NaN != NaN 为 true
  //     // 因此 `val1 > val2` 和 `val1 < val2` 都为 false，最终导致返回 0
  //     expect(versionCompare('1.0.abc', '1.0.0')).toBe(0);
  //     expect(versionCompare('1.0.0', '1.0.xyz')).toBe(0);
  //     expect(versionCompare('1.0.abc', '1.0.xyz')).toBe(0);
  //     expect(versionCompare('1.abc.2', '1.def.3')).toBe(0);
  //   });
  // });
});
