import { type ReactNode, createContext } from "react";
import useCSSVar from "../hooks/useCSSVar";
import styles from "./grid.module.scss";

export const DEFAULT_GRID_H = parseFloat(styles.hGrid.replace("rem", "")) * 16;
export const DEFAULT_GRID_V = parseFloat(styles.vGrid.replace("rem", "")) * 16;

export const GridContext = createContext({
  h: DEFAULT_GRID_H,
  v: DEFAULT_GRID_V,
});

export function ProvideGridContext({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const vGrid = useCSSVar("number", "--vGrid", DEFAULT_GRID_V);
  const hGrid = useCSSVar("number", "--hGrid", DEFAULT_GRID_H);

  return (
    <GridContext.Provider
      value={{
        v: vGrid,
        h: hGrid,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}
