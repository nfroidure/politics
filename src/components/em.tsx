import styles from "./em.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Emphasis({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <em className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </em>
  );
}
