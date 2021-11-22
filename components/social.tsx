import { FACEBOOK_ACCOUNT, TWITTER_ACCOUNT } from "../utils/constants";
import { publicRuntimeConfig } from "../utils/config";

export default function Social(): JSX.Element {
  return (
    <nav>
      <ul>
        <li className="twitter">
          <a
            href={`https://twitter.com/${TWITTER_ACCOUNT}`}
            title="Suivre notre campagne sur Twitter"
            target="_blank"
          >
            <span>Twitter</span>
          </a>
        </li>
        <li className="facebook">
          <a
            href={`https://facebook.com/${FACEBOOK_ACCOUNT}`}
            title="Suivre notre campagne sur Facebook"
            target="_blank"
          >
            <span>Facebook</span>
          </a>
        </li>
      </ul>
      <style jsx>{`
        ul {
          display: flex;
          justify-content: center;
          list-style-type: none;
        }
        li {
          list-style-type: none;
        }
        a {
          display: block;
          width: var(--vRythm);
          height: var(--vRythm);
          background: var(--light);
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: calc(var(--vRythm) * 1);
          -webkit-mask-size: calc(var(--vRythm) * 1);
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/twitter.svg");
        }
        li.facebook a {
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/facebook.svg");
        }
        span {
          display: none;
        }
      `}</style>
    </nav>
  );
}
