import Link from "next/link";
import styles from "./a.module.scss";
import type { ComponentProps } from "react";

export default function Anchor({
  children,
  href,
  className,
  icon,
  iconPosition = "first",
  ...props
}: {
  icon?: string;
  iconPosition?: "first" | "last";
} & Exclude<ComponentProps<typeof Link>, "href" | "target"> & {
    title: string;
  }) {
  return (
    <Link
      {...{
        href,
      }}
      className={[
        styles.root,
        ...(className ? [className] : []),
        ...(icon
          ? [iconPosition === "first" ? styles.first : styles.last]
          : []),
      ].join(" ")}
      {...props}
      target={href.toString().startsWith("http") ? "_blank" : "_self"}
    >
      {icon ? <span className={styles.icon} /> : null}
      {children}
    </Link>
  );
}
