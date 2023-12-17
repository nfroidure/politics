import styles from "./button.module.scss";
import Link from "next/link";
import { prefix } from "inline-style-prefixer";
import type { LinkProps } from "next/link";
import type { ButtonHTMLAttributes } from "react";

export const ICONS = [
  "arrow-down",
  "arrow-right",
  "check",
  "feed",
  "mail",
  "target",
  "arrow-left",
  "arrow-up",
  "facebook",
  "link",
  "remove",
  "twitter",
] as const;
type Icon = (typeof ICONS)[number];

type BaseProps =
  | {
      label: string;
      icon?: Icon;
    }
  | {
      label?: string;
      icon: Icon;
    };

export default function Button({
  type,
  title,
  disabled,
  label,
  icon,
  ...props
}:
  | (BaseProps & {
      type: "link";
      title?: string;
      disabled?: boolean;
    } & LinkProps)
  | ({ type: "button" } & BaseProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)
  | ({ type: "submit" } & BaseProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)): JSX.Element {
  return (
    <span
      className={[
        styles.root,
        ...(icon ? [styles.icon] : []),
        ...(!label ? [styles.no_label] : []),
        ...(icon && label ? [styles.both] : []),
      ].join(" ")}
    >
      {type === "link" ? (
        <Link legacyBehavior {...(props as LinkProps)}>
          <a
            className={[
              styles.button,
              ...(disabled ? [styles.disabled] : []),
            ].join(" ")}
            onClick={(e) => disabled && e.preventDefault()}
            title={title}
          >
            {icon ? (
              <span
                className={styles.icon}
                style={prefix({
                  maskImage: icon ? `url('/images/icons/${icon}.svg')` : "",
                })}
              ></span>
            ) : null}
            {label ? <span className={styles.label}>{label}</span> : null}
          </a>
        </Link>
      ) : (
        <button
          className={[
            styles.button,
            ...(disabled ? [styles.disabled] : []),
          ].join(" ")}
          {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)}
          disabled={disabled}
        >
          {icon ? (
            <span
              className={styles.icon}
              style={prefix({
                maskImage: icon ? `url('/images/icons/${icon}.svg')` : "",
              })}
            ></span>
          ) : null}
          {label ? <span className={styles.label}>{label}</span> : null}
        </button>
      )}
    </span>
  );
}
