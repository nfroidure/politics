import Link from "next/link";
import { publicRuntimeConfig } from "../utils/config";
import { CSS_BREAKPOINT_END_M, CSS_BREAKPOINT_END_S, CSS_BREAKPOINT_START_L, CSS_BREAKPOINT_START_M } from "../utils/constants";

const Header = () => {
  return (
    <>
      <header>
        <Link href="/">
          <a>
            <span className="slogan">L'écologie dans le Douaisis, avec et pour vous&nbsp;!</span>
            <span className="description">Nicolas Froidure</span>
          </a>
        </Link>
      </header>
      <style jsx>{`
        header {
          background-color: var(--secondary-darker);
        }
        a {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          margin: 0 auto;
          padding: var(--vRythm) var(--gutter);
          width: 100%;
          height: calc(var(--vRythm) * 12);
          color: var(--grey);
          text-decoration: none;
          font-size: var(--normalFontSize);
          line-height: var(--normalLineHeight);
          background-image: url("${publicRuntimeConfig.buildPrefix}/images/nicolas_froidure_filigrane.png");
          background-position: left bottom;
          background-color: var(--secondary);
          background-size: contain;
          background-repeat: no-repeat;
          box-shadow: 1px 1px 5px;
        }
        span.slogan {
          font-family: var(--writingFont);
          font-size: var(--greatFontSize);
          line-height: var(--greatLineHeight);
        }
        span.description {
          font-family: var(--contentFont);
          font-size: var(--normalFontSize);
          line-height: var(--normalLineHeight);
        }

        @media screen and (max-width: ${CSS_BREAKPOINT_END_S}) {
          a {
            width: 100%;
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) and (max-width: ${CSS_BREAKPOINT_END_M}) {
          a {
            width: calc(calc(var(--block) * 2) + calc(var(--gutter) * 3));
          }
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          a {
            width: calc(calc(var(--block) * 3) + calc(var(--gutter) * 4));
          }
        }
      `}</style>
    </>
  );
};

export default Header;
