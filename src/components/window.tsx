import "./window.sass";

import { useProxyState } from "hooks/useProxyState";
import { makeChanger } from "lib/makeChanger";
import React, { FC, MouseEventHandler, ReactPortal, useEffect, useRef, useState } from "react";

import { makeCloseCurrent, makeUpCurrent } from "./main";

interface IWindow {
  width?: number;
  height?: number;
  title?: string;
}

export const Window: FC<IWindow> = ({ children, ...props }) => {
  const upCurrent = makeUpCurrent() as MouseEventHandler;
  const closeCurrent = makeCloseCurrent() as MouseEventHandler;
  const state = useProxyState(() => ({
    title: 'Window'
  }));

  const s = useProxyState(() => ({
    width: props.width ?? 300,
    height: props.height ?? 300,
    x: 0,
    y: 0
  }));

  const ref = useRef<SVGForeignObjectElement>();

  const [{ downedX, downedY }] = useState(() => ({
    downedX: [] as ((v: number) => any)[],
    downedY: [] as ((v: number) => any)[]
  }));

  useEffect(() => {
    state.title = props.title ?? 'Window';
  }, [props.title]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      for (const x of downedX) x(e.pageX);
      for (const y of downedY) y(e.pageY);

      if (downedX.length || downedY.length)
        e.preventDefault();
    };

    const mouseUp = (e: MouseEvent) => {
      if (downedX.length || downedY.length)
        e.preventDefault();

      downedX.splice(0);
      downedY.splice(0);
      console.log(downedX, downedY);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  const headerDown: MouseEventHandler = (e) => {
    e.preventDefault();
    downedX.push(makeChanger(s, v => v.x, e.pageX));
    downedY.push(makeChanger(s, v => v.y, e.pageY));
  };

  const topDown: MouseEventHandler = (e) => {
    e.preventDefault();
    downedY.push(makeChanger(s, v => v.height, e.pageY, -1));
    downedY.push(makeChanger(s, v => v.y, e.pageY));
  };

  const leftDown: MouseEventHandler = (e) => {
    e.preventDefault();
    downedX.push(makeChanger(s, v => v.width, e.pageX, -1));
    downedX.push(makeChanger(s, v => v.x, e.pageX));
  };

  const rightDown: MouseEventHandler = (e) => {
    e.preventDefault();
    downedX.push(makeChanger(s, v => v.width, e.pageX));
  };

  const bottomDown: MouseEventHandler = (e) => {
    e.preventDefault();
    downedY.push(makeChanger(s, v => v.height, e.pageY));
  };

  const topLeftDown: MouseEventHandler = (e) => {
    e.preventDefault();
    topDown(e);
    leftDown(e);
  };

  const topRightDown: MouseEventHandler = (e) => {
    e.preventDefault();
    topDown(e);
    rightDown(e);
  };

  const bottomLeftDown: MouseEventHandler = (e) => {
    e.preventDefault();
    bottomDown(e);
    leftDown(e);
  };

  const bottomRightDown: MouseEventHandler = (e) => {
    e.preventDefault();
    bottomDown(e);
    rightDown(e);
  };

  return (
    <foreignObject ref={ref as any} className="window" onMouseDown={upCurrent} {...s}>
      <header onMouseDown={headerDown}>{state.title}</header>
      <div onMouseDown={topDown} data-top />
      <div onMouseDown={leftDown} data-left />
      <div onMouseDown={rightDown} data-right />
      <div onMouseDown={bottomDown} data-bottom />
      <div onMouseDown={topLeftDown} data-topleft />
      <div onMouseDown={topRightDown} data-topright />
      <div onMouseDown={bottomLeftDown} data-bottomleft />
      <div onMouseDown={bottomRightDown} data-bottomright />
      <div onMouseDown={closeCurrent} data-close />
      <div className="content">
        {children}
      </div>
    </foreignObject>
  );
};