type CapitalizeString<T> = T extends string ? `${Capitalize<T>}` : T;

type FirstChar<T> = T extends `${infer L}${infer _R}` ? L : never;

type LastChar<T, F extends string = ''> = T extends `${infer L}${infer R}` ? LastChar<R, L> : F;

type StringToTuple<T, F extends unknown[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...F, L]> : F;

type TupleToString<T, F extends string = ''> = T extends [infer L, ...infer R]
  ? TupleToString<R, `${F}${L & string}`> // 模板字符串拼接
  : F;

type RepeatString<T extends string, C, A extends unknown[] = [], F extends string = ''> = C extends A['length']
  ? F
  : RepeatString<T, C, [...A, null], `${F}${T}`>;

type SplitString<T extends string, S extends string, F extends string[] = []> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...F, L]>
  : [...F, T];

type LengthOfString<T extends string, F extends string[] = []> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [...F, L]>
  : F['length'];

type KebabCase<T extends string, F extends string = ''> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${F}${Capitalize<L> extends L ? `-${Lowercase<L>}` : L}`>
  : RemoveFirst<F>;

type RemoveFirst<T extends string> = T extends `${infer _L}${infer R}` ? R : T;

type CamelCase<T extends string, F extends string = ''> = T extends `${infer L}-${infer R1}${infer R2}`
  ? CamelCase<R2, `${F}${L}${Capitalize<R1>}`>
  : Capitalize<`${F}${T}`>;

type Include<T extends string, C extends string> = T extends ''
  ? C extends ''
    ? true
    : false
  : T extends `${infer _L}${C}${infer _R}`
    ? true
    : false;

type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer L} ` ? TrimRight<L> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;

type Replace<T extends string, C extends string, RC extends string, F extends string = ''> = C extends ''
  ? T extends ''
    ? RC
    : `${RC}${T}`
  : T extends `${infer L}${C}${infer R}`
    ? Replace<R, C, RC, `${F}${L}${RC}`>
    : `${F}${T}`;

export type { CamelCase, CapitalizeString, FirstChar, Include, KebabCase, LastChar, LengthOfString, RemoveFirst };
//
export type { RepeatString, SplitString, StringToTuple, TupleToString };
//
export type { Replace, Trim, TrimLeft, TrimRight };
