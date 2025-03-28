import styles from "./blockquote.module.scss";
import type { ReactNode, BlockquoteHTMLAttributes } from "react";

export default function Blockquote({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & BlockquoteHTMLAttributes<HTMLElement>) {
  return (
    <blockquote
      className={styles.root + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </blockquote>
  );
}
