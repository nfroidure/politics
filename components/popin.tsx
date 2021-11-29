import {
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
} from "../utils/constants";
import type { Dispatch, SetStateAction } from "react";

export default function Popin({
  popinIsVisible,
  setPopinIsVisible,
  children,
}: {
  popinIsVisible: boolean;
  setPopinIsVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={`popin ${popinIsVisible ? "visible" : "hidden"}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setPopinIsVisible(() => false);
      }}
    >
      <div className="content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <style jsx>{`
        .popin {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
          transition: all calc(var(--baseAnimationRate) * 2) ease;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: var(--vRythm);
        }
        .popin.visible {
          visibility: visible;
          opacity: 1;
        }
        .popin.hidden {
          visibility: hidden;
          opacity: 0;
        }
        .content {
          background: var(--light);
          color: var(--dark);
          padding: var(--vRythm) calc(var(--gutter) * 2);
          min-height: var(--vRythm);
          border-radius: var(--borderRadius);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          .popin {
            padding: 0;
            justify-content: stretch;
            align-items: flex-end;
          }
          .content {
            width: 100%;
            heigth: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .content {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
            padding: var(--vRythm) calc(var(--gutter) * 2);
          }
        }
      `}</style>
    </div>
  );
}
