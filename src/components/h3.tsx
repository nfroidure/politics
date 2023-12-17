import styles from "./h3.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading3({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h3 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h3>
  );
}
