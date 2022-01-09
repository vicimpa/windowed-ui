import { TPath } from "./objectPath";

export const makeObjectPath = (callback: (v: any) => any) => {
  const history: TPath = [];
  const object: any = new Proxy({} as any, {
    get(_, key) {
      history.push(key);
      return object;
    }
  });
  callback(object);
  return [...history];
};