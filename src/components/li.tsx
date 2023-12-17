import styles from "./li.module.scss";
import { ReactNode, LiHTMLAttributes } from "react";

export default function ListItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className={styles.root + (className ? " " + className : "")} {...props}>
      {children}
    </li>
  );
}
