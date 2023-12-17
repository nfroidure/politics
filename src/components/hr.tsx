import styles from "./hr.module.scss";
import type { HTMLAttributes } from "react";

export default function HorizontalRule({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return (
    <>
      <hr
        className={styles.root + (className ? " " + className : "")}
        {...props}
      />
    </>
  );
}
