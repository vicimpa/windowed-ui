import "./launcher.sass";

import { MainState } from "components/main";
import { Window } from "components/window";
import { ReactNode, useContext } from "react";

import { Counter } from "./counter";


export const makeOpenWindow = () => {
  const ctx = useContext(MainState);
  return (node: ReactNode, width?: number, height?: number) => {
    ctx.windows.push(<Window {...{ width, height }} key={`i${ctx.index++}`}>{node}</Window>);
  };
};

export const Launcher = () => {
  const openWindow = makeOpenWindow();

  return (
    <div className="launcher">
      <button onClick={() => openWindow(<h1>Hello world</h1>)}>Launch Hello world!</button>
      <button onClick={() => openWindow(<h1>Hello world 2</h1>, 600, 400)}>Launch Hello world 2!</button>
      <button onClick={() => openWindow(<Counter />)}>Launch Counter!</button>
    </div>
  );
};