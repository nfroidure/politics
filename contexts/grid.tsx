import React from "react";

export const DEFAULT_GRID_H = 0.5 * 16;
export const DEFAULT_GRID_V = 0.375 * 16;

export const GridContext = React.createContext({
  h: DEFAULT_GRID_H,
  v: DEFAULT_GRID_V,
});
