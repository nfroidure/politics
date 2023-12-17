import styles from "./ol.module.scss";
import type { ReactNode, OlHTMLAttributes } from "react";

export default function OrderedList({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </ol>
  );
}
