import { pathJoin } from "../../utils/files";
import { readEntries } from "../../utils/frontmatter";
import buildMetadata from "../../utils/metadata";
import { readParams } from "../../utils/params";
import { slicePage } from "../../utils/pagination";
import {
  entriesToBaseListingMetadata,
  POSTS_PER_PAGE,
  type AgendaDate,
} from "../../utils/agendaDate";
import AgendaEntries from "./entries";
import { type BasePagingPageMetadata } from "../../utils/contents";
import { type BuildQueryParamsType } from "../../utils/params";
import { type Metadata } from "next";

export type Props = BasePagingPageMetadata<AgendaDate>;

const PARAMS_DEFINITIONS = {
  page: {
    type: "number",
    mode: "unique",
  },
} as const;

type Params = BuildQueryParamsType<typeof PARAMS_DEFINITIONS>;

export async function generateMetadata(props: {
  params?: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = params?.page || 1;

  const title = `Agenda politique${page && page !== 1 ? ` - page ${page}` : ""}`;
  const description =
    "Découvrez les évènements militants importants du Douaisis.";

  const metadata = await buildMetadata({
    pathname: `/agenda${page && page !== 1 ? `/pages/${page}` : ""}`,
    title,
    description,
    image: {
      url: "/images/agenda.png",
      alt: "Bannière de la page agenda",
    },
  });

  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates || {}),
      types: {
        ...(metadata.alternates?.types || {}),
        "application/rss+xml": [
          { url: "/agenda.rss", title: `${title} (RSS)` },
        ],
        "application/atom+xml": [
          { url: "/agenda.atom", title: `${title} (Atom)` },
        ],
      },
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const castedParams = readParams(PARAMS_DEFINITIONS, params || {}) as Params;
  const page = castedParams?.page || 1;
  const baseListingMetadata = entriesToBaseListingMetadata(
    await readEntries<AgendaDate>(pathJoin(".", "contents", "agenda")),
  );
  const entries = slicePage(baseListingMetadata.entries, page, POSTS_PER_PAGE);

  return (
    <AgendaEntries
      entries={entries}
      page={page}
      pagesCount={baseListingMetadata.pagesCount}
    />
  );
}
