import { join as pathJoin } from "path";
import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import { readEntries } from "../utils/frontmatter";
import { toASCIIString } from "../utils/ascii";
import { parseMarkdown, renderMarkdown } from "../utils/markdown";
import { publicRuntimeConfig } from "../utils/config";
import type { MarkdownRootNode } from "../utils/markdown";
import Strong from "../components/strong";
import Anchored from "../components/anchored";
import { fixText } from "../utils/text";

export type Metadata = {
  title: string;
  date: string;
  draft: boolean;
};
export type Entry = {
  id: string;
  content: MarkdownRootNode;
} & Metadata;

type Props = {
  entries: Entry[];
};

const Page = ({ entries }: Props) => (
  <Layout
    title="La FAQ"
    image={`${publicRuntimeConfig.buildPrefix}/images/faq.png`}
  >
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
  </Layout>
);

export const getStaticProps = async () => {
  const entries = (
    await readEntries<Metadata>(pathJoin(".", "contents", "faq"))
  )
    .map<Entry>((entry) => ({
      ...entry.attributes,
      id: toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort(({ date: dateA }: any, { date: dateB }: any) =>
      new Date(dateA).getTime() > new Date(dateB).getTime() ? -1 : 1
    );

  return { props: { entries } as Props };
};

export default Page;
