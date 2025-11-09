"use client";

import { type ReactNode, createContext } from "react";
import useCSSVar from "../hooks/useCSSVar";

// Not supported by TurboPack so commenting until resolution
// and replacing per raw values reported from CSS vars
// See https://github.com/vercel/next.js/discussions/74093
// import styles from "./grid.module.scss";

// export const DEFAULT_GRID_V = parseFloat(styles.vGrid.replace("rem", ""));
// export const DEFAULT_GRID_H = parseFloat(styles.hGrid.replace("rem", ""));
// export const DEFAULT_V_RHYTHM_RATIO = parseFloat(styles.vRhythmRatio);
// export const DEFAULT_COLUMN_RATIO = parseFloat(styles.columnRatio);
// export const DEFAULT_GUTTER_RATIO = parseFloat(styles.gutterRatio);

export const DEFAULT_GRID_V = 0.1875;
export const DEFAULT_GRID_H = 0.55;
export const DEFAULT_V_RHYTHM_RATIO = 8;
export const DEFAULT_COLUMN_RATIO = 8;
export const DEFAULT_GUTTER_RATIO = 3;

export const GridContext = createContext({
  vGrid: DEFAULT_GRID_H,
  hGrid: DEFAULT_GRID_V,
  vRhythmRatio: DEFAULT_V_RHYTHM_RATIO,
  columnRatio: DEFAULT_COLUMN_RATIO,
  gutterRatio: DEFAULT_GUTTER_RATIO,
});

export default function ProvideGridContext({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const vGrid = useCSSVar("number", "--vGrid", DEFAULT_GRID_V);
  const hGrid = useCSSVar("number", "--hGrid", DEFAULT_GRID_H);
  const vRhythmRatio = useCSSVar(
    "number",
    "--vRhythmRatio",
    DEFAULT_V_RHYTHM_RATIO,
  );
  const gutterRatio = useCSSVar(
    "number",
    "--gutterRatio",
    DEFAULT_COLUMN_RATIO,
  );
  const columnRatio = useCSSVar(
    "number",
    "--columnRatio",
    DEFAULT_GUTTER_RATIO,
  );

  return (
    <GridContext.Provider
      value={{
        vGrid,
        hGrid,
        vRhythmRatio,
        gutterRatio,
        columnRatio,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}
