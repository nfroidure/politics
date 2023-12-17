import styles from "./ul.module.scss";
import type { HTMLAttributes, ReactNode } from "react";

export default function UnorderedList({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={styles.ul + (className ? " " + className : "")} {...props}>
      {children}
    </ul>
  );
}
