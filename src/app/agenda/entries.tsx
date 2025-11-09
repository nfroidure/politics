import styles from "./entries.module.scss";
import Anchor from "../../components/a";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Events from "./events";
import Paragraph from "../../components/p";
import { type AgendaDate } from "../../utils/agendaDate";
import { type BasePagingPageMetadata } from "../../utils/contents";

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
          href={"/agenda.ics"}
          title={"Ajouter cet agenda à votre calendrier"}
          target="_blank"
        >
          via ce lien
        </Anchor>
        .
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
