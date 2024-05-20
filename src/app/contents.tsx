import { type ReactNode } from "react";
import styles from "./contents.module.scss";

export default function Contents({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
