import styles from "./anchored.module.scss";
import Link from "next/link";
import type { ReactNode } from "react";

export default function Anchored({
  children,
  id = "",
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <span className={styles.root}>
      {children}{" "}
      <small>
        <Link
          href={`#${id}`}
          className={styles.icon}
          id={id}
          title="Lien vers cette section"
        >
          <span>🔗</span>
        </Link>
      </small>
    </span>
  );
}
