import styles from "./h1.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading1({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h1 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h1>
  );
}
