import Link from "next/link";
import { useRouter } from "next/router";
import { publicRuntimeConfig } from "../utils/config";
import {
  CSS_BREAKPOINT_END_M,
  CSS_BREAKPOINT_END_S,
  CSS_BREAKPOINT_START_L,
  CSS_BREAKPOINT_START_M,
} from "../utils/constants";

const Menu = () => {
  const router = useRouter();

  return (
    <div className="root">
      <nav>
        <Link href="/">
          <a
            className={`home ${router.asPath === "/" ? "selected" : ""}`}
            title="Revenir à l'accueil"
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
          href="mailto:nicolas.froidure@gmail.com?subject=Abonnement"
          title="S'abonner à ma lettre d'information"
        >
          <span>S'abonner</span>
        </a>
      </nav>
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
