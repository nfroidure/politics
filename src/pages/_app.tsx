import React from "react";
import "../../styles/normalize.css";
import "../../styles/main.css";
import {
  DEFAULT_GRID_H,
  DEFAULT_GRID_V,
  GridContext,
  GridSystem,
} from "../components/_gridSystem";
import useCSSVar from "../hooks/useCSSVar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const vGrid = useCSSVar("number", "--vGrid", DEFAULT_GRID_V);
  const hGrid = useCSSVar("number", "--hGrid", DEFAULT_GRID_H);

  return (
    <>
      <GridContext.Provider
        value={{
          v: vGrid,
          h: hGrid,
        }}
      >
        <Component {...pageProps} />
      </GridContext.Provider>
      {process.env.NODE_ENV === "development" ? <GridSystem /> : null}
    </>
  );
}

export default MyApp;
