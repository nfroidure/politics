import styles from "./popin.module.scss";
import type { Dispatch, SetStateAction } from "react";

export default function Popin({
  popinIsVisible,
  setPopinIsVisible,
  children,
}: {
  popinIsVisible: boolean;
  setPopinIsVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        styles.popin,
        ...(popinIsVisible ? [styles.visible] : [styles.hidden]),
      ].join(" ")}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setPopinIsVisible(() => false);
      }}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
