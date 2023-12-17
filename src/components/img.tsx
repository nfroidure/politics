import styles from "./img.module.scss";
import type { ImgHTMLAttributes } from "react";

export type ImageOrientation = "portrait" | "landscape" | "square";
export type ImageFloating = "left" | "right";

export default function Img({
  orientation = "landscape",
  float,
  className,
  ...props
}: {
  orientation: ImageOrientation;
  float?: ImageFloating;
} & ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <span
      className={[
        styles.root,
        ...(float ? [styles[float]] : []),
        ...(orientation ? [styles[orientation]] : []),
        ...(className ? [className] : []),
      ].join(" ")}
    >
      <img {...props} />
    </span>
  );
}
