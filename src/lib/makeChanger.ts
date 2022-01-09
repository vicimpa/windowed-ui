import { makeObjectPath } from "./makeObjectPath";
import { getValue, setValue } from "./objectPath";

export const makeChanger = <T extends object>(object: T, select: (v: T) => number, start: number, move = 1) => {
  const path = makeObjectPath(select);
  const startValue = getValue(object, path) as number;

  return (newStart: number) => {
    const delta = (start - newStart) * move;
    setValue(object, path, startValue - delta);
  };
};


