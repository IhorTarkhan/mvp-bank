export type FormicErrors<T> = { [P in keyof T]?: string };

export const getTranslateError = (target: any, key: any) => {
  return target[key as keyof typeof target];
};
