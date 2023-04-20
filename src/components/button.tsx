import React from "react";
import Link from "next/link";
import { prefix } from "inline-style-prefixer";
import { publicRuntimeConfig } from "../utils/config";
import type { LinkProps } from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { CSS_BREAKPOINT_END_S } from "../utils/constants";

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
type Icon = typeof ICONS[number];

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
    <span className={`root${icon && label ? " both" : ""}`}>
      {type === "link" ? (
        <Link legacyBehavior {...(props as LinkProps)}>
          <a
            className={`button${disabled ? " disabled" : ""}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
              disabled && e.preventDefault()
            }
            title={title}
          >
            {icon ? (
              <span
                className="icon"
                style={prefix({
                  maskImage: icon
                    ? `url('${publicRuntimeConfig.buildPrefix}/images/icons/${icon}.svg')`
                    : "",
                })}
              ></span>
            ) : null}
            {label ? <span className="label">{label}</span> : null}
          </a>
        </Link>
      ) : (
        <button
          className="button"
          {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)}
          disabled={disabled}
        >
          {icon ? (
            <span
              className="icon"
              style={prefix({
                maskImage: icon
                  ? `url('${publicRuntimeConfig.buildPrefix}/images/icons/${icon}.svg')`
                  : "",
              })}
            ></span>
          ) : null}
          {label ? <span className="label">{label}</span> : null}
        </button>
      )}
      <style jsx>{`
        .root {
          display: block;
          height: calc(var(--vRythm) * 2);
          max-width: 100%;
        }
        .button {
          display: inline-flex;
          flex-direction: horizontal;
          justify-content: center;
          align-items: center;
          width: ${icon && !label ? `calc(var(--vRythm) * 0.8)` : "auto"};
          height: calc(var(--vRythm) * 1.6);
          min-width: var(--block);
          line-height: calc(var(--vRythm) * 1.6);
          font-size: var(--bigFontSize);
          appearance: none;
          border: none;
          border-radius: var(--borderRadius);
          font-weight: bold;
          background-color: var(--primary);
          color: var(--light);
          cursor: pointer;
          text-decoration: none;
        }
        .button:hover:not([disabled]),
        .button:focus:not([disabled]) {
          opacity: 0.85;
        }
        .button:disabled,
        .button.disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        span.icon {
          display: block;
          height: calc(var(--vRythm) * 1.6);
          width: var(--gutter);
          background-color: var(--light);
          mask-repeat: no-repeat;
          mask-position: center center;
          mask-size: 100%;
        }
        .root.both span.icon {
          margin: 0 var(--hGrid) 0 0;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          .button {
            display: flex;
            max-width: 100%;
            min-width: auto;
            width: auto;
          }
        }
      `}</style>
    </span>
  );
}
