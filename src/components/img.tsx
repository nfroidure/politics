import styles from "./img.module.scss";
import type { ImgHTMLAttributes } from "react";

export type ImageOrientation = "portrait" | "landscape" | "square";
export type ImageFloating = "left" | "right";

export default function Img({
  orientation = "landscape",
  float,
  className,
  alt,
  showAlt,
  title,
  ...props
}: {
  orientation: ImageOrientation;
  float?: ImageFloating;
  alt: string;
  showAlt?: boolean;
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
      <span className={styles.picture}>
        <img alt={alt} {...{ ...props, ...(title ? { title } : {}) }} />
      </span>
      {showAlt ? <span className={styles.alt}>{alt}</span> : null}
    </span>
  );
}
