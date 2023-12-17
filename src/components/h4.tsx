import styles from "./h4.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Heading4({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <h4 className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </h4>
  );
}
