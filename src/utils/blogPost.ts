import { toASCIIString } from "./ascii";
import { parseMarkdown, qualifyPath } from "./markdown";
import { datedPagesSorter } from "./contents";
import type { FrontMatterResult } from "front-matter";
import type {
  BaseContentPageMetadata,
  BaseListingPageMetadata,
} from "./contents";
import type { MarkdownRootNode } from "./markdown";

export type BlogPostFrontmatterMetadata = {
  leafname?: string;
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
  audio?: {
    url: string;
    type: string;
  };
};

export type BlogPost = {
  id: string;
  content: MarkdownRootNode;
} & BlogPostFrontmatterMetadata &
  BaseContentPageMetadata;

export const POSTS_PER_PAGE = 10;
export const entriesToBaseListingMetadata = (
  baseEntries: FrontMatterResult<BlogPostFrontmatterMetadata>[]
): BaseListingPageMetadata<BlogPost> => {
  const entries = baseEntries
    .map<BlogPost>((entry) => ({
      ...entry.attributes,
      ...(entry.attributes.illustration
        ? {
            illustration: {
              ...entry.attributes.illustration,
              url: qualifyPath(entry.attributes.illustration.url),
            },
          }
        : {}),
      id: entry.attributes.leafname || toASCIIString(entry.attributes.title),
      content: parseMarkdown(entry.body) as MarkdownRootNode,
    }))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort(datedPagesSorter);

  return {
    entries,
    pagesCount: Math.ceil(entries.length / POSTS_PER_PAGE),
  };
};
