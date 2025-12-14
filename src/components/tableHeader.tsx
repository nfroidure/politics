import styles from "./tableHeader.module.scss";

import { type HTMLAttributes, type ReactNode } from "react";

export default function TableHeader({
  children,
  sorting = "disabled",
  className,
  onClick,
  ...props
}: {
  children: ReactNode;
  sorting?: "disabled" | "asc" | "desc" | "not_set_asc" | "not_set_desc";
} & HTMLAttributes<HTMLTableCellElement>): ReactNode {
  return (
    <th
      className={[
        styles.th,
        ...(sorting === "asc"
          ? [styles.asc]
          : sorting === "desc"
            ? [styles.desc]
            : sorting === "not_set_asc"
              ? [styles.not_set_asc]
              : sorting === "not_set_desc"
                ? [styles.not_set_desc]
                : [styles.disabled]),
        ...(className ? [className] : []),
      ].join(" ")}
      {...props}
      onClick={onClick}
    >
      {children}
      <span className={styles.icon} />
    </th>
  );
}
