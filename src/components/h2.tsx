import styles from "./h2.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading2({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h2 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h2>
  );
}
