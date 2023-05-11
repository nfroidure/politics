import type { BaseContentPageMetadata } from "./contents";
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
};

export type BlogPost = {
  id: string;
  content: MarkdownRootNode;
} & BlogPostFrontmatterMetadata &
  BaseContentPageMetadata;
