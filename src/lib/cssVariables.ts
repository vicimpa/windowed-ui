import { CSSProperties } from "react";

export const cssVariables = <T extends { [key: string]: string; }>(input: T) => {
  const style: CSSProperties = {} as any;

  for (const [key, value] of Object.entries(input))
    (style as any)[`--${key}`] = value;

  return style;
};