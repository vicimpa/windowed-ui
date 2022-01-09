export type TPath = (string | symbol)[];

export const getValue = (object: any, path: TPath): any => {
  path = [...path];
  while (path.length)
    object = object[path.shift()!];

  return object;
};

export const setValue = (object: any, path: TPath, value: any): any => {
  path = [...path];
  const last = path.pop();

  while (path.length)
    object = object[path.shift()!];

  return object[last!] = value;
};