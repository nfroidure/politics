import { DEFAULT_GRID_V, DEFAULT_V_RHYTHM_RATIO } from "../contexts/grid";
import { useEffect } from "react";
import useCSSRemValue from "./useCSSRemValue";
import useCSSVar from "./useCSSVar";

export function useGridScroll(level: "grid" | "rhythm") {
  const remValue = useCSSRemValue();
  const vGrid = useCSSVar("number", "--vGrid", DEFAULT_GRID_V);
  const vRhythmRatio = useCSSVar(
    "number",
    "--vRhythmRatio",
    DEFAULT_V_RHYTHM_RATIO,
  );

  useEffect(() => {
    const gap = vGrid * (level === "rhythm" ? vRhythmRatio : 1) * remValue;
    const handleScroll = (event: WheelEvent) => {
      const scrollY = Math.ceil((window.scrollY + event.deltaY) / gap) * gap;

      event.preventDefault();
      event.stopPropagation();
      window.scrollTo(window.scrollX, scrollY);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [level]);
}
