import {
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_L,
} from "../utils/constants";
import type { ImgHTMLAttributes } from "react";

export type ImageOrientation = "portrait" | "landscape" | "square";
export type ImageFloating = "left" | "right";

const Img = ({
  orientation = "landscape",
  float,
  ...props
}: {
  orientation: ImageOrientation;
  float?: ImageFloating;
} & ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <span
      className={`root${float ? " " + float : ""}${
        orientation ? " " + orientation : ""
      }`}
    >
      <img className={props.className || ""} {...props} />
      <style jsx>{`
        .root {
          clear: both;
          display: flex;
          width: 100%;
          max-width: 100%;
          background: var(--secondary);
          padding: calc(var(--vRythm) / 2) calc(var(--gutter) / 2);
          margin: var(--vRythm) 0;
          align-items: center;
          justify-content: center;
        }
        /* For mobile device we forget layout shift
        since what we want is the biggest image size possible */
        img {
          max-width: 100%;
          max-height: 100%;
        }
        /* For other screens we take care of the image
        orientation and build boxes that respect the
        vertical rythm and horizontal dimensions of the
        layout avoiding layout shifting */
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          .root.left {
            float: left;
            margin: 0 var(--gutter) var(--vRythm) 0;
          }
          .root.right {
            float: right;
            margin: 0 0 var(--vRythm) var(--gutter);
          }
          .root.left,
          .root.right {
            width: var(--block);
            height: calc(var(--vRythm) * 10);
          }
          .root.left.landscape,
          .root.right.landscape {
            height: calc(var(--vRythm) * 8);
          }
          .root.left.portrait,
          .root.right.portrait {
            height: calc(var(--vRythm) * 14);
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .root.left,
          .root.right {
            width: calc(calc(var(--column) * 4) + calc(var(--gutter) * 3));
            height: calc(var(--vRythm) * 14);
          }
          .root.left.landscape,
          .root.right.landscape {
            height: calc(var(--vRythm) * 11);
          }
          .root.left.portrait,
          .root.right.portrait {
            height: calc(var(--vRythm) * 19);
          }
        }
      `}</style>
    </span>
  );
};

export default Img;
