import styles from "./footer.module.scss";
import Link from "next/link";
import Social from "./social";
import { ORGANISATION_NAME } from "../utils/constants";

export default function Footer() {
  return (
    <div className={styles.root}>
      <footer>
        <div className={styles.bottom}>
          <p>
            <span>© {ORGANISATION_NAME} - Tous droits réservés</span> -{" "}
            <Link href="/mentions-legales">Mentions légales</Link>
          </p>
          <Social />
        </div>
      </footer>
    </div>
  );
}
