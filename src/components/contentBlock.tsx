import styles from "./contentBlock.module.scss";
import { ReactNode } from "react";

export default function ContentBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={styles.root + (className ? " " + className : "")}>
      {children}
    </section>
  );
}
