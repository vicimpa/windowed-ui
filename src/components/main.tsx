import "./main.sass";

import { useProxyState } from "hooks/useProxyState";
import { createContext, createElement, Fragment, ReactNode, useContext } from "react";
import { Launcher } from "components/launcher";

export const MainState = createContext<{ windows: ReactNode[]; index: number; }>([] as any);
export const CurrentWindow = createContext<ReactNode>(null);
export const makeUpCurrent = () => {
  const ctx = useContext(CurrentWindow);
  const state = useContext(MainState);

  return () => {
    const index = state.windows.indexOf(ctx);
    if (index != -1) {
      state.windows.splice(index, 1);
      state.windows.push(ctx);
    }
  };
};

export const makeCloseCurrent = () => {
  const ctx = useContext(CurrentWindow);
  const state = useContext(MainState);

  return () => {
    const index = state.windows.indexOf(ctx);
    if (index != -1) {
      state.windows.splice(index, 1);
    }
  };
};

export const Main = () => {
  const state = useProxyState({ windows: [] as ReactNode[], index: 0 });

  return (
    <MainState.Provider value={state}>
      <svg className="main" width="100vw" height="100vh">
        <foreignObject width="100%" height="100%">
          <Launcher />
        </foreignObject>
        {createElement(Fragment, {}, ...state.windows.map((e, i) => {
          console.log(e);
          return (
            <CurrentWindow.Provider key={(e as any).key} value={e}>
              {e}
            </CurrentWindow.Provider>
          );
        }))}
      </svg>
    </MainState.Provider>
  );
};