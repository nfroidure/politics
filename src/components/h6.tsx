import styles from "./h6.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading6({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h6 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h6>
  );
}
