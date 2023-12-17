import styles from "./p.module.scss";
import type { ReactNode, HTMLAttributes } from "react";

export default function Paragraph({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </p>
  );
}
