import styles from "./items.module.scss";
import Heading2 from "./h2";
import Paragraph from "./p";
import Anchor from "./a";
import Img from "./img";
import type { BaseContentPageMetadata } from "../utils/contents";

export default function Items<T extends BaseContentPageMetadata>({
  entries,
  base,
}: {
  entries: T[];
  base: string;
}) {
  return (
    <div className={styles.entries}>
      {entries.map((entry) => (
        <div className={styles.entry_item} key={entry.id}>
          {entry.illustration ? (
            <p className={styles.entry_illustration}>
              <Anchor href={`${base}${entry.id}`}>
                <Img
                  float="left"
                  orientation="landscape"
                  src={entry.illustration.url}
                  alt={entry.illustration.alt}
                />
              </Anchor>
            </p>
          ) : null}
          <Heading2 className={styles.entry_title}>
            <Anchor href={`${base}${entry.id}`} className={styles.no_underline}>
              {entry.title}
            </Anchor>
          </Heading2>
          <Paragraph className={styles.entry_description}>
            {entry.description}{" "}
            <Anchor href={`${base}${entry.id}`}>Lire la suite</Anchor>
          </Paragraph>
          <div className={styles.clear}></div>
        </div>
      ))}
    </div>
  );
}
