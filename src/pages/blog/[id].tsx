import { DOMAIN_NAME } from "../../utils/constants";
import { fixText } from "../../utils/text";
import { renderMarkdown } from "../../utils/markdown";
import { pathJoin } from "../../utils/files";
import { entriesToBaseListingMetadata } from "./index";
import { readEntries } from "../../utils/frontmatter";
import { datedPagesSorter } from "../../utils/contents";
import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Share from "../../components/share";
import Items from "../../components/items";
import type { BlogPost } from "../../utils/blogPost";
import type { GetStaticProps, GetStaticPaths } from "next";

type Params = { id: string };
type Props = {
  entry: BlogPost;
  linkedEntries: BlogPost[];
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
        <aside>
          <Heading2>Commenter et partager</Heading2>
          <Share
            url={`https://${DOMAIN_NAME}/blog/${entry.id}`}
            title={entry.title}
          />
        </aside>
        {linkedEntries.length ? (
          <aside>
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
          </aside>
        ) : null}
      </ContentBlock>
      <style>{`
      @media print {
        aside {
          display: none;
        }
      }
      `}</style>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const baseProps = entriesToBaseListingMetadata(
    await readEntries<BlogPost>(pathJoin(".", "contents", "blog"))
  );

  const paths = baseProps.entries.map((entry) => ({
    params: { id: entry.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const baseProps = entriesToBaseListingMetadata(
    await readEntries<BlogPost>(pathJoin(".", "contents", "blog"))
  );
  const entry = baseProps.entries.find(
    ({ id }) => id === (params || {}).id
  ) as BlogPost;
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
    .sort(datedPagesSorter);
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
