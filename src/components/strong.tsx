import styles from "./strong.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Strong({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <strong
      className={styles.root + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </strong>
  );
}
