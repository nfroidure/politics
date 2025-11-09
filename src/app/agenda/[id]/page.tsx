import { DOMAIN_NAME, LOCALE, TIME_ZONE } from "../../../utils/constants";
import { fixText } from "../../../utils/text";
import { qualifyPath, renderMarkdown } from "../../../utils/markdown";
import { pathJoin } from "../../../utils/files";
import { readEntries } from "../../../utils/frontmatter";
import buildMetadata from "../../../utils/metadata";
import ContentBlock from "../../../components/contentBlock";
import Paragraph from "../../../components/p";
import Share from "../../../components/share";
import {
  entriesToBaseListingMetadata,
  type AgendaDateFrontmatterMetadata,
  type AgendaDate,
} from "../../../utils/agendaDate";
import { Fragment } from "react/jsx-runtime";
import Heading1 from "@/components/h1";
import Anchor from "@/components/a";

export async function generateMetadata(props: {
  params?: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<AgendaDateFrontmatterMetadata>(
      pathJoin(".", "contents", "agenda")
    )
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id
  ) as AgendaDate;

  return buildMetadata({
    pathname: `/agenda/${entry.id}`,
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
    await readEntries<AgendaDate>(pathJoin(".", "contents", "agenda"))
  );
  const entry = baseListingMetadata.entries.find(
    ({ id }) => id === (params || {}).id
  ) as AgendaDate;

  return (
    <ContentBlock>
      <Heading1>{entry.title}</Heading1>
      <Paragraph>
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
        }).format(Date.parse(entry.date))}
        <br />
        <br />
      </Paragraph>
      {renderMarkdown({ index: 0 }, entry.content)}
      <Paragraph>
        Publié le{" "}
        {new Intl.DateTimeFormat(LOCALE, {
          timeZone: TIME_ZONE,
          dateStyle: "full",
          timeStyle: "medium",
        }).format(Date.parse(entry.date))}
        .
      </Paragraph>
      <Paragraph>
        <Anchor href={"/agenda"} title="Retour à la liste">
          Retour
        </Anchor>
      </Paragraph>
      <Share
        url={`https://${DOMAIN_NAME}/agenda/${entry.id}`}
        title={entry.title}
      />
    </ContentBlock>
  );
}

export async function generateStaticParams() {
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<AgendaDateFrontmatterMetadata>(
      pathJoin(".", "contents", "agenda")
    )
  );
  const paths = baseListingMetadata.entries.map((entry) => ({
    id: entry.id,
  }));

  return paths;
}
