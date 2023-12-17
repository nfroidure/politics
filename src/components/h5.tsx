import styles from "./h5.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading5({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h5 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h5>
  );
}
