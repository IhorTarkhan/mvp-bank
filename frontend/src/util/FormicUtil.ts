export type FormicErrors<T> = { [P in keyof T]?: string };

export const getTranslateErrorOf = (target: any, key: any) => {
  return target[key as keyof typeof target];
};
