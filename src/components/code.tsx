import styles from "./code.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Code({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={styles.root + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </code>
  );
}
