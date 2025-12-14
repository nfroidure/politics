import styles from "./tableRow.module.scss";

import { type HTMLAttributes, type ReactNode } from "react";

export default function TableRow({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>): ReactNode {
  return (
    <tr
      className={[styles.tr, ...(className ? [className] : [])].join(" ")}
      {...props}
    >
      {children}
    </tr>
  );
}
