import styles from "./tableCell.module.scss";

import { type HTMLAttributes, type ReactNode } from "react";

export default function TableCell({
  children,
  colSpan,
  className,
  ...props
}: {
  children: ReactNode;
  colSpan?: number;
} & HTMLAttributes<HTMLTableCellElement>): ReactNode {
  return (
    <td
      className={[styles.td, ...(className ? [className] : [])].join(" ")}
      colSpan={colSpan}
      {...props}
    >
      {children}
    </td>
  );
}
