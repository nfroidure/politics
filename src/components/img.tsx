import {
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_L,
} from "../utils/constants";
import type { HTMLAttributes } from "react";

const Img = ({
  float,
  ...props
}: {
  float?: "left" | "right";
} & HTMLAttributes<HTMLImageElement>) => {
  return (
    <>
      <img
        className={`${float ? float + " " : ""}${props.className || ""}`}
        {...props}
      />
      <style jsx>{`
        img {
          clear: both;
          display: block;
          width: 100%;
          max-width: 100%;
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          img.left,
          img.right {
            width: var(--block);
          }
          img.left {
            float: left;
            margin-right: var(--gutter);
          }
          img.right {
            float: right;
            margin-left: var(--gutter);
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          img.left,
          img.right {
            width: calc(calc(var(--column) * 4) + calc(var(--gutter) * 3));
          }
        }
      `}</style>
    </>
  );
};

export default Img;
