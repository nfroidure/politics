import styles from "./entries.module.scss";
import Anchor from "../../components/a";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Events from "./events";
import Paragraph from "../../components/p";
import { type AgendaDate } from "../../utils/agendaDate";
import { type BasePagingPageMetadata } from "../../utils/contents";
import UnorderedList from "@/components/ul";
import ListItem from "@/components/li";

export default function AgendaEntries({
  entries,
  page,
  pagesCount,
}: BasePagingPageMetadata<AgendaDate>) {
  return (
    <ContentBlock>
      <Heading1>Agenda</Heading1>
      <Paragraph>
        Grâce à cet agenda, vous pouvez retrouver les divers évènements qui me
        semblent importants dans le Douaisis et où il est probable que nous
        puissions nous croiser. N’hésitez pas à venir vers moi si vous
        m’apercevez. Vous pouvez également ajouter ces derniers à votre propre
        agenda{" "}
        <Anchor
          href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent("webcal://nicolasfroidure.fr/agenda.ics")}`}
          title="Ajouter cet agenda sur votre agenda Google"
          target="_blank"
        >
          via Google Agenda
        </Anchor>
        ,{" "}
        <Anchor
          href={`https://outlook.office.com/calendar/0/addfromweb/?url=${encodeURIComponent("webcal://nicolasfroidure.fr/agenda.ics")}`}
          title="Ajouter cet agenda sur votre calendrier Outlook"
          target="_blank"
        >
          via Outlook
        </Anchor>
        ,{" "}
        <Anchor
          href={`webcal://nicolasfroidure.fr/agenda.ics`}
          title="Utiliser Webcal pour ouvrir cet agenda"
          target="_blank"
        >
          via Webcal
        </Anchor>
        ,{" "}
        <Anchor
          href={`https://nicolasfroidure.fr/agenda.ics`}
          title="Visiter l'URL de cet agenda"
          target="_blank"
        >
          ou via une URL
        </Anchor>.
      </Paragraph>
      <Events entries={entries} base={"/agenda/"} />

      <nav className={styles.pagination}>
        {page > 1 ? (
          <Anchor
            icon="arrow-left"
            href={page > 2 ? `/agenda/pages/${page - 1}` : "/agenda"}
            rel="previous"
            title={`Aller à la page ${page - 1}`}
          >
            Précédent
          </Anchor>
        ) : null}{" "}
        {page < pagesCount ? (
          <Anchor
            icon="arrow-right"
            iconPosition="last"
            href={`/agenda/pages/${page + 1}`}
            rel="next"
            title={`Aller à la page ${page + 1}`}
          >
            Suivant
          </Anchor>
        ) : null}
      </nav>
    </ContentBlock>
  );
}
