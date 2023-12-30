import styles from "./share.module.scss";
import { ORGANISATION_CONTACT, TWITTER_ACCOUNT } from "../utils/constants";
import Paragraph from "./p";
import Anchor from "./a";
import Heading2 from "./h2";

export default function Share({
  url,
  title,
}: {
  url: string;
  title: string;
}): JSX.Element {
  return (
    <aside className={styles.root}>
      <Heading2>Commenter et partager</Heading2>
      <Paragraph>
        <Anchor
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`}
          title="Commenter sur Facebook"
          target="_blank"
        >
          <span className={[styles.icon, styles.facebook].join(" ")} />
          Facebook
        </Anchor>
        {" - "}
        <Anchor
          href={`https://twitter.com/intent/tweet/?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}&via=${TWITTER_ACCOUNT}`}
          title="Commenter sur Twitter"
          target="_blank"
        >
          <span className={[styles.icon, styles.twitter].join(" ")} />
          Twitter
        </Anchor>
        {" - "}
        <Anchor
          href={`mailto:${ORGANISATION_CONTACT}`}
          title="Me répondre par courriel"
          target="_blank"
        >
          <span className={[styles.icon, styles.mail].join(" ")} />
          Courriel
        </Anchor>
      </Paragraph>
    </aside>
  );
}
