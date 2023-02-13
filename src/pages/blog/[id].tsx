import { join as pathJoin } from "path";
import { entriesToBaseProps } from "./index";
import { readEntries } from "../../utils/frontmatter";
import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Share from "../../components/share";
import Items from "../../components/items";
import { DOMAIN_NAME } from "../../utils/constants";
import { fixText } from "../../utils/text";
import { renderMarkdown } from "../../utils/markdown";
import { datedItemsSorter, toItem } from "../../utils/items";
import type { Metadata } from "./index";
import type { Entry } from ".";
import type { Item } from "../../utils/items";
import type { GetStaticProps, GetStaticPaths } from "next";

type Params = { id: string };
type Props = {
  entry: Entry;
  linkedEntries: Item[];
};

const BlogPost = ({ entry, linkedEntries }: Props) => {
  return (
    <Layout
      title={`${fixText(entry.title)}`}
      description={fixText(entry.description)}
      image={entry.illustration?.url}
    >
      <ContentBlock>
        {renderMarkdown({ index: 0 }, entry.content)}
        <Paragraph>
          Publié le {new Date(entry.date).toLocaleString()}.
        </Paragraph>
        <Heading2>Commenter et partager</Heading2>
        <Share
          url={`https://${DOMAIN_NAME}/blog/${entry.id}`}
          title={entry.title}
        />
        {linkedEntries.length ? (
          <>
            <Heading2>
              {linkedEntries.length === 1
                ? "Article similaire"
                : "Articles similaires"}
            </Heading2>
            <Paragraph>
              {`Dans ${
                linkedEntries.length === 1 ? "la catégorie" : "les catégories"
              } `}
              {linkedEntries.length === 1
                ? entry.categories[0]
                : `${entry.categories.slice(1).join(", ")} et ${
                    entry.categories[0]
                  }`}
              .
            </Paragraph>
            <Items entries={linkedEntries} base="./" />
          </>
        ) : null}
      </ContentBlock>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin(".", "contents", "blog"))
  );

  const paths = baseProps.entries.map((entry) => ({
    params: { id: entry.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const baseProps = entriesToBaseProps(
    await readEntries<Metadata>(pathJoin(".", "contents", "blog"))
  );
  const entry = baseProps.entries.find(
    ({ id }) => id === (params || {}).id
  ) as Entry;
  const linkedEntries = baseProps.entries
    .filter(
      (anEntry) =>
        entry.id !== anEntry.id &&
        !anEntry.draft &&
        entry.categories.some((category) =>
          anEntry.categories.some(
            (actualCategory) => category === actualCategory
          )
        )
    )
    .map(toItem)
    .sort(datedItemsSorter);
  const pastEntries = linkedEntries.filter(
    (anEntry) => Date.parse(anEntry.date) < Date.parse(entry.date)
  );
  const recenterEntries = linkedEntries.filter(
    (anEntry) => Date.parse(anEntry.date) > Date.parse(entry.date)
  );

  return {
    props: {
      entry,
      linkedEntries: pastEntries.concat(recenterEntries).slice(0, 3),
    },
  };
};
