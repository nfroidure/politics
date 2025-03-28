import { DOMAIN_NAME } from "../../../utils/constants";
import styles from "./page.module.scss";
import { fixText } from "../../../utils/text";
import { qualifyPath, renderMarkdown } from "../../../utils/markdown";
import { pathJoin } from "../../../utils/files";
import { readEntries } from "../../../utils/frontmatter";
import buildMetadata from "../../../utils/metadata";
import { datedPagesSorter } from "../../../utils/contents";
import ContentBlock from "../../../components/contentBlock";
import Heading2 from "../../../components/h2";
import Paragraph from "../../../components/p";
import Share from "../../../components/share";
import Items from "../../../components/items";
import {
  entriesToBaseListingMetadata,
  type BlogPostFrontmatterMetadata,
  type BlogPost,
} from "../../../utils/blogPost";

export async function generateMetadata(props: {
  params?: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<BlogPostFrontmatterMetadata>(
      pathJoin(".", "contents", "blog"),
    ),
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id,
  ) as BlogPost;

  return buildMetadata({
    pathname: `/blog/${entry.id}`,
    title: fixText(entry.title),
    description: fixText(entry.description),
    type: "article",
    ...(typeof entry.illustration !== "undefined"
      ? {
          image: {
            url: qualifyPath(entry.illustration.url),
            alt: entry.illustration.alt,
          },
        }
      : {}),
    ...(typeof entry.audio !== "undefined"
      ? {
          audio: {
            url: qualifyPath(entry.audio.url),
            type: entry.audio.type,
          },
        }
      : {}),
  });
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<BlogPost>(pathJoin(".", "contents", "blog")),
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id,
  ) as BlogPost;
  const allLinkedEntries = baseListingMetadata.entries
    .filter(
      (anEntry) =>
        entry.id !== anEntry.id &&
        !anEntry.draft &&
        entry.categories.some((category) =>
          anEntry.categories.some(
            (actualCategory) => category === actualCategory,
          ),
        ),
    )
    .sort(datedPagesSorter);
  const pastEntries = allLinkedEntries.filter(
    (anEntry) => Date.parse(anEntry.date) < Date.parse(entry.date),
  );
  const recenterEntries = allLinkedEntries.filter(
    (anEntry) => Date.parse(anEntry.date) > Date.parse(entry.date),
  );
  const linkedEntries = pastEntries.concat(recenterEntries).slice(0, 3);

  return (
    <ContentBlock>
      {renderMarkdown({ index: 0 }, entry.content)}
      <Paragraph>
        Publié le{" "}
        {new Intl.DateTimeFormat("fr-FR", {
          timeZone: "Europe/Paris",
          dateStyle: "full",
          timeStyle: "medium",
        }).format(Date.parse(entry.date))}
        .
      </Paragraph>
      <Share
        url={`https://${DOMAIN_NAME}/blog/${entry.id}`}
        title={entry.title}
      />
      {linkedEntries.length ? (
        <aside className={styles.linkedEntries}>
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
  );
}

export async function generateStaticParams() {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<BlogPostFrontmatterMetadata>(
      pathJoin(".", "contents", "blog"),
    ),
  );
  const paths = baseListingMetadata.entries.map((entry) => ({
    id: entry.id,
  }));

  return paths;
}
