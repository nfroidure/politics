"use client";

import { useContext } from "react";
import ProvideGridContext, { GridContext } from "./grid";
import useCSSRemValue from "../hooks/useCSSRemValue";

export function TestGridContext() {
  return (
    <ProvideGridContext>
      (<InnerGridContext />)
    </ProvideGridContext>
  );
}
export function InnerGridContext() {
  const c = useContext(GridContext);
  const r = useCSSRemValue();

  return (
    <p>
      {JSON.stringify({ ...c, r })}
      <br />
      {c.vRhythmRatio * c.vGrid * r}
    </p>
  );
}
