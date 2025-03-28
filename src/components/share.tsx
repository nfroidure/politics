import styles from "./share.module.scss";
import { ORGANISATION_CONTACT } from "../utils/constants";
import Paragraph from "./p";
import Anchor from "./a";
import Heading2 from "./h2";

export default function Share({ url, title }: { url: string; title: string }) {
  return (
    <aside className={styles.root}>
      <Heading2>Commenter et partager</Heading2>
      <Paragraph>
        <Anchor
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url,
          )}&t=${encodeURIComponent(title)}`}
          title="Commenter sur Facebook"
          target="_blank"
        >
          <span className={[styles.icon, styles.facebook].join(" ")} />
          Facebook
        </Anchor>
        {" - "}
        <Anchor
          href={`https://bsky.app/intent/compose?text=${encodeURIComponent(title)}`}
          title="Commenter sur Bluesky"
          target="_blank"
        >
          <span className={[styles.icon, styles.bluesky].join(" ")} />
          Bluesky
        </Anchor>
        {" - "}
        <Anchor
          href={`mailto:${ORGANISATION_CONTACT}?subject=${encodeURIComponent(`A propos de "${title}"`)}`}
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
