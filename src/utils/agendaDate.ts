import { toASCIIString } from "./ascii";
import { parseMarkdown, qualifyPath, type MarkdownRootNode } from "./markdown";
import { datedPagesSorter } from "./contents";
import type { FrontMatterResult } from "front-matter";
import type {
  BaseContentPageMetadata,
  BaseListingPageMetadata,
} from "./contents";

export type AgendaDateFrontmatterMetadata = {
  title: string;
  description: string;
  date: string;
  startDate: string;
  duration: {
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
  location: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  draft: boolean;
  tags: string[];
  categories: string[];
  illustration?: {
    url: string;
    alt: string;
  };
  audio?: {
    url: string;
    type: string;
  };
};

export type AgendaDate = {
  id: string;
  content: MarkdownRootNode;
} & AgendaDateFrontmatterMetadata &
  BaseContentPageMetadata;

export const POSTS_PER_PAGE = 25;
export const entriesToBaseListingMetadata = (
  baseEntries: FrontMatterResult<AgendaDateFrontmatterMetadata>[],
): BaseListingPageMetadata<AgendaDate> => {
  const entries = baseEntries
    .map<AgendaDate>((entry) => ({
      ...entry.attributes,
      ...(entry.attributes.illustration
        ? {
            illustration: {
              ...entry.attributes.illustration,
              url: qualifyPath(entry.attributes.illustration.url),
            },
          }
        : {}),
      id: toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort(datedPagesSorter);

  return {
    entries,
    pagesCount: Math.ceil(entries.length / POSTS_PER_PAGE),
  };
};
