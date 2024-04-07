import styles from "./social.module.scss";
import {
  BLUESKY_ACCOUNT,
  BLUESKY_APP,
  BLUESKY_SERVER,
  FACEBOOK_ACCOUNT,
  LINKEDIN_ACCOUNT,
  MASTODON_ACCOUNT,
  MASTODON_SERVER,
  TWITTER_ACCOUNT,
} from "../utils/constants";

export default function Social(): JSX.Element {
  return (
    <nav className={styles.root}>
      <ul>
        <li className={styles.mastodon}>
          <a
            href={`https://${MASTODON_SERVER}/@${MASTODON_ACCOUNT}`}
            rel="me"
            title="Me suivre sur Mastodon"
            target="_blank"
          >
            <span>Mastodon</span>
          </a>
        </li>
        <li className={styles.bluesky}>
          <a
            href={`https://${BLUESKY_APP}/profile/${BLUESKY_ACCOUNT}.${BLUESKY_SERVER}`}
            rel="me"
            title="Me suivre sur Bluesky"
            target="_blank"
          >
            <span>Bluesky</span>
          </a>
        </li>
        <li className={styles.linkedin}>
          <a
            href={`https://www.linkedin.com/in/${LINKEDIN_ACCOUNT}/`}
            rel="me"
            title="Me suivre sur LinkedIn"
            target="_blank"
          >
            <span>LinkedIn</span>
          </a>
        </li>
        <li className={styles.twitter}>
          <a
            href={`https://twitter.com/${TWITTER_ACCOUNT}`}
            rel="me"
            title="Me suivre sur Twitter"
            target="_blank"
          >
            <span>Twitter</span>
          </a>
        </li>
        <li className={styles.facebook}>
          <a
            href={`https://facebook.com/${FACEBOOK_ACCOUNT}`}
            rel="me"
            title="Me suivre sur Facebook"
            target="_blank"
          >
            <span>Facebook</span>
          </a>
        </li>
        <li className={styles.feed}>
          <a
            href="/blog.atom"
            title="S’abonner aux mises à jour"
            target="_blank"
          >
            <span>Flux de syndication</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
