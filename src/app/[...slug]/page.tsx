import styles from "./page.module.scss";
import { fixText } from "../../utils/text";
import {
  parseMarkdown,
  qualifyPath,
  renderMarkdown,
} from "../../utils/markdown";
import { readEntry } from "../../utils/frontmatter";
import { pathJoin, readDirDeep } from "../../utils/files";
import { toASCIIString } from "../../utils/ascii";
import ContentBlock from "../../components/contentBlock";
import type { MarkdownRootNode } from "../../utils/markdown";
import buildMetadata from "../../utils/metadata";
import Share from "../../components/share";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import { DOMAIN_NAME } from "../../utils/constants";

type PageFrontmatterMetadata = {
  date: string;
  title: string;
  description: string;
  author: string;
  illustration?: {
    url: string;
    alt: string;
  };
};
type Entry = {
  id: string;
  content: MarkdownRootNode;
} & PageFrontmatterMetadata;

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const entry = await parsePage(params.slug);

  return buildMetadata({
    pathname: "/" + pathJoin(...params.slug),
    title: fixText(entry.title),
    description: fixText(entry.description),
    ...(entry.illustration?.url
      ? {
          image: {
            url: qualifyPath(entry.illustration.url),
            alt: entry.illustration.alt,
          },
        }
      : {}),
  });
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const entry = await parsePage(params.slug);

  return (
    <ContentBlock className={styles.contents}>
      {renderMarkdown({ index: 0 }, entry.content)}
      <div className={styles.clear}></div>
      <Share
        url={`https://${DOMAIN_NAME}/${pathJoin(...params.slug)}`}
        title={entry.title}
      />
      <Paragraph className={styles.back}>
        <Anchor href="/" title="Revenir à la page d'accueil">
          Retour
        </Anchor>
      </Paragraph>
    </ContentBlock>
  );
}

async function parsePage(slug: string[] = []): Promise<Entry> {
  const path = pathJoin("contents", "pages", ...slug);
  let result;

  try {
    result = await readEntry<PageFrontmatterMetadata>(path + ".md");
  } catch {
    result = await readEntry<PageFrontmatterMetadata>(path + "/index.md");
  }

  return {
    ...result.attributes,
    id: toASCIIString(result.attributes.title),
    content: parseMarkdown(result.body) as MarkdownRootNode,
  };
}

export async function generateStaticParams() {
  const base = pathJoin(".", "contents", "pages");
  const paths = (await readDirDeep(`${base}/**/*.md`)).map((path) => {
    const slug = path
      .replace(base + "/", "")
      .replace(".md", "")
      .split("/");

    if (slug[slug.length - 1] === "index") {
      slug.pop();
    }

    return { slug };
  });

  return paths;
}
