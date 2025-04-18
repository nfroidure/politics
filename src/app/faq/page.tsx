import { pathJoin } from "../../utils/files";
import { readEntries } from "../../utils/frontmatter";
import buildMetadata from "../../utils/metadata";
import { toASCIIString } from "../../utils/ascii";
import { parseMarkdown, renderMarkdown } from "../../utils/markdown";
import { fixText } from "../../utils/text";
import { datedPagesSorter } from "../../utils/contents";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Strong from "../../components/strong";
import Anchored from "../../components/anchored";
import type { MarkdownRootNode } from "../../utils/markdown";

export type FAQItemFrontmatterMetadata = {
  title: string;
  date: string;
  draft: boolean;
};
export type FAQItem = {
  id: string;
  content: MarkdownRootNode;
} & FAQItemFrontmatterMetadata;

export async function generateMetadata() {
  return buildMetadata({
    pathname: "/faq",
    title: "La FAQ",
    description:
      "Recueil de réponses aux questions qui me sont fréquemment posées.",
    image: {
      url: "/images/faq.png",
      alt: "Bannière de la page FAQ",
    },
  });
}

export default async function Page() {
  const entries = (
    await readEntries<FAQItemFrontmatterMetadata>(
      pathJoin(".", "contents", "faq"),
    )
  )
    .map((entry) => ({
      ...entry.attributes,
      id: toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort(datedPagesSorter);

  return (
    <ContentBlock>
      <Heading1>La FAQ</Heading1>
      <Paragraph>
        Les réseaux sociaux représentent un bon moyen de s’adresser à une
        population plus large que les seul·es initié·es du milieu politique.
      </Paragraph>
      <Paragraph>
        Ils sont cependant aussi le lieu privilégié par les personnes mal
        intentionnées pour dire tout et n’importe quoi, notamment sous couvert
        d’anonymat.
      </Paragraph>
      <Paragraph>
        Pour gagner en temps, mais aussi en qualité, au lieu de répondre
        individuellement,{" "}
        <Strong>je prendrais le temps de détailler mes réponses</Strong> aux
        diverses attaques et je les consignerai ici afin d’ensuite partager un
        lien vers celles-ci à la suite des commentaires sur les réseaux sociaux.
      </Paragraph>
      <Paragraph>
        Ces questions pourront parfois vous paraitre farfelues, je n’en suis pas
        l’auteur, seules les réponses sont de mon fait.
      </Paragraph>
      <Paragraph>
        Une manière simple, d’illustrer mon approche bienveillante envers nos
        concitoyen·ne·s en menant{" "}
        <Strong>des réflexions construites et constructives</Strong>.
      </Paragraph>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Heading2>
            <Anchored id={entry.id}>{fixText(entry.title)}</Anchored>
          </Heading2>
          {renderMarkdown({ index: 0 }, entry.content)}
        </div>
      ))}
    </ContentBlock>
  );
}
