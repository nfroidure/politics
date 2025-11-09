import styles from "./events.module.scss";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import Img from "../../components/img";
import { type AgendaDate } from "@/utils/agendaDate";
import { Fragment } from "react/jsx-runtime";
import { LOCALE, TIME_ZONE } from "@/utils/constants";

export default function Events({
  entries,
  base,
}: {
  entries: AgendaDate[];
  base: string;
}) {
  return (
    <div className={styles.entries}>
      {entries.map((entry) => (
        <div className={styles.entry_item} key={entry.id}>
          {entry.illustration ? (
            <p className={styles.entry_illustration}>
              <Anchor
                href={`${base}${entry.id}`}
                title="Voir la page de l’évènement"
              >
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
            <Anchor
              href={`${base}${entry.id}`}
              title="Voir la page de l’évènement"
              className={styles.no_underline}
            >
              {entry.title}
            </Anchor>
          </Heading2>
          <Paragraph className={styles.entry_description}>
            {entry.location ? (
              <Fragment>
                📍{" "}
                {entry.geolocation ? (
                  <Anchor
                    href={`geo:${entry.geolocation.lat},${entry.geolocation.lng}`}
                    title="Voir sur un plan"
                    target="_blank"
                  >
                    {entry.location}
                  </Anchor>
                ) : (
                  entry.location
                )}
                <br />
              </Fragment>
            ) : null}
            📅{" "}
            {new Intl.DateTimeFormat(LOCALE, {
              timeZone: TIME_ZONE,
              dateStyle: "full",
              timeStyle: "medium",
            }).format(Date.parse(entry.startDate))}
            <br />
            <br />
            {entry.description}{" "}
            <Anchor href={`${base}${entry.id}`} title="Lire le billet complet">
              Lire la suite
            </Anchor>
          </Paragraph>
          <div className={styles.clear}></div>
        </div>
      ))}
    </div>
  );
}
