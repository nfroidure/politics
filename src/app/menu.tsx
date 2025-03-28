"use client";

import styles from "./menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Popin from "../components/popin";
import Button from "../components/button";
import { ORGANISATION_CONTACT } from "../utils/constants";

const MENU_ITEMS = [
  {
    href: "/",
    label: "Accueil",
    title: "Revenir à l’accueil",
  },
  {
    href: "/blog",
    label: "Blog",
    title: "Lire le blog",
  },
  {
    href: "/biographie",
    label: "Biographie",
    title: "Lire ma biographie",
  },
  {
    href: "/faq",
    label: "FAQ",
    title: "Lire mes questions/réponses",
  },
  {
    href: "#",
    label: "S’abonner",
    title: "S’abonner à ma lettre d’information",
  },
];

export default function Menu() {
  const pathname = usePathname();
  const [popinIsVisible, setPopinIsVisible] = useState(false);

  return (
    <div className={styles.root}>
      <nav>
        {MENU_ITEMS.map(({ href, label, title }) => (
          <Link
            key={href}
            href={href}
            className={[
              ...(href === pathname ? [styles.selected] : []),
              ...(href === "#" ? [styles.newsletter] : []),
            ].join(" ")}
            title={title}
            {...(href === "#"
              ? {
                  onClick: () => setPopinIsVisible(true),
                }
              : {})}
          >
            <span className={styles.icon} />
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </nav>
      <Popin {...{ popinIsVisible, setPopinIsVisible }}>
        <Heading2>Lettre d’information</Heading2>
        <Paragraph>
          Suivez mon action grâce à de cours résumés envoyés régulièrement sur
          votre boîte mail.
        </Paragraph>
        <Paragraph>
          <Button
            type="link"
            href={`mailto:${ORGANISATION_CONTACT}?subject=Abonnement&body=${encodeURIComponent(
              "Je souhaite m’abonner à votre lettre d’information.",
            )}`}
            label="S’inscrire"
            icon="mail"
          />
        </Paragraph>
      </Popin>
    </div>
  );
}
