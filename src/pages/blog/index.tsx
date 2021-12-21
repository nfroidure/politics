import { join as pathJoin } from "path";
import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import { readEntries } from "../../utils/frontmatter";
import { toASCIIString } from "../../utils/ascii";
import { CSS_BREAKPOINT_START_L } from "../../utils/constants";
import { parseMarkdown } from "../../utils/markdown";
import type { MarkdownRootNode } from "../../utils/markdown";
import type { GetStaticProps } from 'next';

export type Metadata = {
  title: string;
  description: string;
  date: string;
  draft: boolean;
  tags: string[];
  categories: string[];
  illustration?: {
    url: string;
    alt: string;
  };
};
export type Entry = {
  id: string;
  content: MarkdownRootNode;
} & Metadata;

type Props = {
  title: string;
  description: string;
  entries: Entry[];
};

const BlogEntries = ({ title, description, entries }: Props) => (
  <Layout title={title} description={description}>
    <ContentBlock className="title">
      <Heading1 className="title">Blog</Heading1>
      <Paragraph>
        Retrouvez mes billets politiques sur cette page. Les propos que je tiens
        sur ce blog ne sont pas le reflet des positions prises par Europe
        Écologie-Les Verts, ni celles du groupe local du Douaisis et n'engagent
        que moi.
      </Paragraph>

      <div className="entries">
        {entries.map((entry) => (
          <div className="entry_item" key={entry.id}>
            {entry.illustration ? (
              <Paragraph className="entry_illustration">
                <Anchor href={`/blog/${entry.id}`}>
                  <img
                    src={entry.illustration.url}
                    alt={entry.illustration.alt}
                  />
                </Anchor>
              </Paragraph>
            ) : null}
            <Heading2 className="entry_title">
              <Anchor href={`/blog/${entry.id}`} className="no_underline">
                {entry.title}
              </Anchor>
            </Heading2>
            <Paragraph className="entry_description">
              {entry.description}{" "}
              <Anchor href={`/blog/${entry.id}`}>Lire la suite</Anchor>
            </Paragraph>
            <div className="clear"></div>
          </div>
        ))}
      </div>
    </ContentBlock>
    <style jsx>{`
      :global(.entry_title) {
        margin-top: 0 !important;
      }
      :global(.entry_title a) {
        text-decoration: none !important;
      }
      :global(.entry_illustration) {
        margin: 0 !important;
      }
      :global(.entry_description) {
        margin: 0 !important;
      }
      .entry_item {
        padding: var(--vRythm) 0;
        border-bottom: var(--border) solid var(--dark);
      }
      .entry_item:first-child {
        padding: 0 0 var(--vRythm) 0;
      }
      .entry_item:last-child {
        border: none;
        padding: var(--vRythm) 0 0 0;
      }
      img {
        width: 100%;
      }

      @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
        img {
          float: left;
          width: var(--block);
          margin-right: var(--gutter);
        }
        .clear {
          clear: left;
        }
      }
    `}</style>
  </Layout>
);

export const getStaticProps:GetStaticProps<Props> = async () => {
  const title = "Blog politique de Nicolas Froidure";
  const description =
    "Découvrez le blog politique de Nicolas Froidure, écologiste à Douai.";
  const entries = (
    await readEntries<Metadata>(pathJoin(".", "contents", "blog"))
  )
    .map<Entry>((entry) => ({
      ...entry.attributes,
      id: toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort(({ date: dateA }: any, { date: dateB }: any) =>
      Date.parse(dateA) > Date.parse(dateB) ? -1 : 1
    );

  return { props: { title, description, entries } as Props };
};

export default BlogEntries;
