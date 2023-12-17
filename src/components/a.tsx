import Link from "next/link";
import styles from "./a.module.scss";
import type { LinkProps } from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";

export default function Anchor({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  className,
  icon,
  iconPosition = "first",
  ...props
}: {
  children: ReactNode;
} & LinkProps & {
    icon?: string;
    iconPosition?: "first" | "last";
  } & Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link
      {...{
        href,
        as,
        replace,
        scroll,
        shallow,
        passHref,
        prefetch,
        locale,
      }}
      className={[
        styles.root,
        ...(className ? [className] : []),
        ...(icon
          ? [iconPosition === "first" ? styles.first : styles.last]
          : []),
      ].join(" ")}
      {...props}
      target={href.startsWith("http") ? "_blank" : "_self"}
    >
      {icon ? <span className={styles.icon} /> : null}
      {children}
    </Link>
  );
}
