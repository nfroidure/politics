import { toASCIIString } from "./ascii";
import { parseMarkdown, qualifyPath, type MarkdownRootNode } from "./markdown";
import { datedPagesSorter } from "./contents";
import type { FrontMatterResult } from "front-matter";
import type {
  BaseContentPageMetadata,
  BaseListingPageMetadata,
} from "./contents";

export type AgendaDuration = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
export type AgendaDateFrontmatterMetadata = {
  title: string;
  description: string;
  organizer: string;
  date: string;
  startDate: string;
  duration: AgendaDuration;
  location: {
    name: string;
    address: string;
  };
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

export function durationToMilliseconds(duration: AgendaDuration): number {
  return (
    ((typeof duration.weeks === "number"
      ? duration.weeks * 7 * 24 * 60 * 60
      : 0) +
      (typeof duration.days === "number" ? duration.days * 24 * 60 * 60 : 0) +
      (typeof duration.hours === "number" ? duration.hours * 60 * 60 : 0) +
      (typeof duration.minutes === "number" ? duration.minutes * 60 : 0) +
      (typeof duration.seconds === "number" ? duration.seconds : 0)) *
    1000
  );
}
