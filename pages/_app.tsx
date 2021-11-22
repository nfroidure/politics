import React from "react";
import "../styles/normalize.css";
import "../styles/main.css";
import { DEFAULT_GRID_H, DEFAULT_GRID_V, GridContext } from "../contexts/grid";
import type { AppProps } from "next/app";
import useDimensions from "../hooks/useDimensions";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [ref, dimensions] = useDimensions({ liveMeasure: true });

  return (
    <>
      <GridContext.Provider
        value={{
          v: dimensions == "none" ? DEFAULT_GRID_V : dimensions.height,
          h: dimensions == "none" ? DEFAULT_GRID_H : dimensions.width,
        }}
      >
        <Component {...pageProps} />
      </GridContext.Provider>
      <span className="gridMeasure" ref={ref}></span>
      <style jsx>{`
        span.gridMeasure {
          display: block;
          opacity: 0;
          position: absolute;
          width: var(--vGrid);
          height: var(--hGrid);
          top: 0;
          left: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}

export default MyApp;
