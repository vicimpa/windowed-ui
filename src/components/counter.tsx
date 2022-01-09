import { useProxyState } from "hooks/useProxyState";
import { useEffect } from "react";
import { makeOpenWindow } from "./launcher";

export const Counter = ({ count = 0 }) => {
  const state = useProxyState({ count });
  const openWindow = makeOpenWindow();

  useEffect(() => {
    const timer = setInterval(() => {
      state.count++;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1>His: {state.count}</h1>
      <button onClick={() => openWindow(<Counter count={state.count} />)}>Open new Counter</button>
    </>
  );
};