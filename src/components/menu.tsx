"use client";

import styles from "./menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Heading2 from "./h2";
import Paragraph from "./p";
import Popin from "./popin";
import Button from "./button";

export default function Menu() {
  const pathname = usePathname();
  const [popinIsVisible, setPopinIsVisible] = useState(false);

  return (
    <div className={styles.root}>
      <nav>
        <Link
          href="/"
          className={`${pathname === "/" ? styles.selected : ""}`}
          title="Revenir à l’accueil"
        >
          <span>Accueil</span>
        </Link>
        <Link
          href="/blog"
          className={
            (pathname || "").startsWith("/blog") ? styles.selected : ""
          }
          title="Lire le blog"
        >
          <span>Blog</span>
        </Link>
        <Link
          href="/biographie"
          className={pathname === "/biographie" ? styles.selected : ""}
          title="Lire ma biographie"
        >
          <span>Biographie</span>
        </Link>
        <Link
          href="/faq"
          className={pathname === "/faq" ? styles.selected : ""}
          title="Lire mes questions/réponses"
        >
          <span>FAQ</span>
        </Link>
        <a
          className={styles.newsletter}
          onClick={() => setPopinIsVisible(true)}
          href="#"
          title="S’abonner à ma lettre d’information"
        >
          <span>S’abonner</span>
        </a>
      </nav>
      <Popin {...{ popinIsVisible, setPopinIsVisible }}>
        <Heading2>Lettre d’information</Heading2>
        <Paragraph>
          Bien que présent sur les réseaux sociaux, je tiens à communiquer au
          maximum en dehors. Vous inscrire à ma lettre d’information reste le
          moyen le plus simple et direct de suivre mon actualité.
        </Paragraph>
        <Paragraph>
          <Button
            type="link"
            href={`mailto:nicolas.froidure@gmail.com?subject=Abonnement&body=${encodeURIComponent(
              "Je souhaite m’abonner à votre lettre d’information."
            )}`}
            label="S’inscrire"
            icon="mail"
          />
        </Paragraph>
      </Popin>
    </div>
  );
}
