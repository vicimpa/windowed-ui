import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

export const useProxyState = <T extends object>(initialState: T | (() => T)) => {
  const state = initialState instanceof Function ? initialState() : initialState;
  const [proxyState] = useState(() => proxy(state));
  useSnapshot(proxyState);
  return proxyState;
};