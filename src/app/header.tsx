import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.root}>
      <Link href="/">
        <span className={styles.slogan}>
          L’écologie dans le Douaisis, avec et pour vous&nbsp;!
        </span>
        <span className={styles.description}>Nicolas Froidure</span>
      </Link>
    </header>
  );
}
