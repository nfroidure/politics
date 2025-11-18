import styles from "./table.module.scss";

import { type HTMLAttributes, type ReactNode } from "react";

export default function Table({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLTableElement>): ReactNode {
  return (
    <div className={styles.root}>
      <table
        className={[styles.table, ...(className ? [className] : [])].join(" ")}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}
