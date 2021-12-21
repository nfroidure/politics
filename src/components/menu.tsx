import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { publicRuntimeConfig } from "../utils/config";
import {
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
} from "../utils/constants";
import Heading2 from "./h2";
import Paragraph from "./p";
import Popin from "./popin";
import Button from "./button";

const Menu = () => {
  const router = useRouter();
  const [popinIsVisible, setPopinIsVisible] = useState(false);

  return (
    <div className="root">
      <nav>
        <Link href="/">
          <a
            className={`home ${router.asPath === "/" ? "selected" : ""}`}
            title="Revenir à l’accueil"
          >
            <span>Accueil</span>
          </a>
        </Link>
        <Link href="/blog">
          <a
            className={router.asPath.startsWith("/blog") ? "selected" : ""}
            title="Lire le blog"
          >
            <span>Blog</span>
          </a>
        </Link>
        <Link href="/biographie">
          <a
            className={router.asPath === "/biographie" ? "selected" : ""}
            title="Lire ma biographie"
          >
            <span>Biographie</span>
          </a>
        </Link>
        <Link href="/faq">
          <a
            className={router.asPath === "/faq" ? "selected" : ""}
            title="Lire mes questions/réponses"
          >
            <span>FAQ</span>
          </a>
        </Link>
        <a
          className="newsletter"
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
      <style jsx>{`
        .root {
          background-color: var(--primary);
        }
        nav {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        nav a,
        nav a:visited {
          display: block;
          color: var(--light);
          font-size: var(--bigFontSize);
          line-height: var(--bigLineHeight);
          text-decoration: none;
          transition: background-color var(--baseAnimationRate),
            color var(--baseAnimationRate);
        }
        nav a:hover {
          color: var(--primary);
          background-color: var(--light);
          text-decoration: underline;
        }
        nav a.selected {
          text-decoration: underline;
          color: var(--secondary-darker);
        }
        nav a.newsletter {
          margin-left: auto;
          background-color: var(--quaternary);
          color: var(--light);
        }
        nav span {
          display: block;
          padding: calc(var(--vRythm) / 2) var(--gutter);
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          nav {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          nav {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          nav {
            flex-direction: row;
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
          .newsletter span {
            width: calc(var(--vRythm));
            background: var(--light);
            mask-repeat: no-repeat;
            mask-position: center center;
            mask-size: calc(var(--vRythm));
            mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/mail.svg");
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
