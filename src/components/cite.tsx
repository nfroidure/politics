import styles from "./cite.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Cite({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <cite
      className={styles.root + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </cite>
  );
}
