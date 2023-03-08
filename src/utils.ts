export type Option = {
  value: unknown;
  text: unknown;
};

export const LOADING_TIME = 2000;

export function makeOptions<T extends Record<string, unknown>>(
  list: T[],
  valueKey: keyof T,
  textKey: keyof T
): Option[] {
  return list.map((item) => {
    return {
      value: item[valueKey],
      text: item[textKey]
    };
  });
}
