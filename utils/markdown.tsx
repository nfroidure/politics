import { unified } from "unified";
import remarkParse from "remark-parse";
import Anchor from "../components/a";
import Blockquote from "../components/blockquote";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Heading3 from "../components/h3";
import Heading4 from "../components/h4";
import Heading5 from "../components/h5";
import Heading6 from "../components/h6";
import HorizontalRule from "../components/hr";
import ListItem from "../components/li";
import OrderedList from "../components/ol";
import Paragraph from "../components/p";
import UnorderedList from "../components/ul";
import Strong from "../components/strong";
import Emphasis from "../components/em";
import Code from "../components/code";
import Cite from "../components/cite";
import { fixText } from "./text";
import YError from "yerror";
import { publicRuntimeConfig } from "../utils/config";
import type { ReactNode } from "react";

export type MarkdownRootNode = {
  type: "root";
  children: MarkdownNode[];
};
type MarkdownParagraphNode = {
  type: "paragraph";
  children: MarkdownNode[];
};
type MarkdownTextNode = {
  type: "text";
  value: "string";
};
type MarkdownBoldNode = {
  type: "bold" | "strong";
  value: "string";
  children: MarkdownNode[];
};
type MarkdownEmphasisNode = {
  type: "emphasis";
  value: "string";
  children: MarkdownNode[];
};
type MarkdownCodeNode = {
  type: "inlineCode";
  value: string;
};
type MarkdownHeadingNode = {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: MarkdownNode[];
};
type MarkdownListNode = {
  type: "list";
  ordered: boolean;
  spread: boolean;
  children: MarkdownNode[];
};
type MarkdownListItemNode = {
  type: "listItem";
  spread: boolean;
  children: MarkdownNode[];
};
type MarkdownBlockquoteNode = {
  type: "blockquote";
  children: MarkdownNode[];
};
type MarkdownHRNode = {
  type: "thematicBreak";
};
type MarkdownImageNode = {
  type: "image";
  url: string;
  alt: string;
  title: string;
};
type MarkdownLinkNode = {
  type: "link";
  url: string;
  title: string;
  children: MarkdownNode[];
};
type MarkdownHTMLNode = {
  type: "html";
  value: "cite" | "abbr";
  children?: MarkdownNode[];
};
type MarkdownNode =
  | MarkdownRootNode
  | MarkdownHeadingNode
  | MarkdownTextNode
  | MarkdownBoldNode
  | MarkdownEmphasisNode
  | MarkdownCodeNode
  | MarkdownParagraphNode
  | MarkdownListNode
  | MarkdownListItemNode
  | MarkdownHRNode
  | MarkdownImageNode
  | MarkdownLinkNode
  | MarkdownHTMLNode
  | MarkdownBlockquoteNode;
type MarkdownNodeType = MarkdownNode["type"];
type MappingContext = { index: number };
type NodeToElementMapper<T extends MarkdownNode> = (
  context: MappingContext,
  node: T
) => React.ReactNode;

const rootMap: NodeToElementMapper<MarkdownRootNode> = (
  context: MappingContext,
  node
) =>
  node.children.map((node, index) =>
    renderMarkdown({ ...context, index }, node)
  );
const paragraphMap: NodeToElementMapper<MarkdownParagraphNode> = (
  context: MappingContext,
  node
) => (
  <Paragraph key={context.index}>
    {node.children.map((node, index) =>
      renderMarkdown({ ...context, index }, node)
    )}
  </Paragraph>
);
const headingMap: NodeToElementMapper<MarkdownHeadingNode> = (
  context: MappingContext,
  node
) =>
  node.depth === 1 ? (
    <Heading1 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading1>
  ) : node.depth === 2 ? (
    <Heading2 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading2>
  ) : node.depth === 3 ? (
    <Heading3 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading3>
  ) : node.depth === 4 ? (
    <Heading4 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading4>
  ) : node.depth === 5 ? (
    <Heading5 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading5>
  ) : (
    <Heading6 key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Heading6>
  );
const textMap: NodeToElementMapper<MarkdownTextNode> = (context, node) => (
  <span key={context.index}>{fixText(node.value)}</span>
);
const boldMap: NodeToElementMapper<MarkdownEmphasisNode> = (context, node) => (
  <Strong key={context.index}>
    {node.children.map((node, index) =>
      renderMarkdown({ ...context, index }, node)
    )}
  </Strong>
);
const emphasisMap: NodeToElementMapper<MarkdownEmphasisNode> = (
  context,
  node
) => (
  <Emphasis key={context.index}>
    {node.children.map((node, index) =>
      renderMarkdown({ ...context, index }, node)
    )}
  </Emphasis>
);
const codeMap: NodeToElementMapper<MarkdownCodeNode> = (context, node) => (
  <Code key={context.index}>{node.value}</Code>
);
const listMap: NodeToElementMapper<MarkdownListNode> = (
  context: MappingContext,
  node
) =>
  node.ordered ? (
    <OrderedList key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </OrderedList>
  ) : (
    <UnorderedList key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </UnorderedList>
  );
const listItemMap: NodeToElementMapper<MarkdownListItemNode> = (
  context: MappingContext,
  node
) => (
  <ListItem key={context.index}>
    {node.children.map((node, index) =>
      renderMarkdown({ ...context, index }, node)
    )}
  </ListItem>
);
const hrMap: NodeToElementMapper<MarkdownHRNode> = (context) => (
  <HorizontalRule key={context.index} />
);
const htmlMap: NodeToElementMapper<MarkdownHTMLNode> = (
  context: MappingContext,
  node
) =>
  node.value === "cite" ? (
    <Cite key={context.index}>
      {(node.children || []).map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Cite>
  ) : null;
const blockquoteMap: NodeToElementMapper<MarkdownBlockquoteNode> = (
  context,
  node
) => (
  <Blockquote key={context.index}>
    {node.children.map((node, index) =>
      renderMarkdown({ ...context, index }, node)
    )}
  </Blockquote>
);
const imageMap: NodeToElementMapper<MarkdownImageNode> = (context, node) => {
  return (
    <span key={context.index}>
      <img
        src={
          node.url.startsWith("http")
            ? node.url
            : publicRuntimeConfig.baseURL +
              publicRuntimeConfig.buildPrefix +
              "/" +
              node.url
        }
        alt={node.alt}
        title={node.title}
      />
      <style jsx>{`
        img {
          clear: both;
          display: block;
          width: 100%;
        }
      `}</style>
    </span>
  );
};
const hyperlinkMap: NodeToElementMapper<MarkdownLinkNode> = (context, node) =>
  (node.url || "").startsWith("https://www.youtube.com/watch") &&
  node?.title === "📺" ? (
    <span className="root" key={context.index}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${node.url.replace(
          /^.*v=([^&$]+).*$/,
          "$1"
        )}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <style jsx>{`
        .root {
          display: block;
          overflow: hidden;
          padding-bottom: 56.25%;
          position: relative;
          height: 0;
        }

        .root iframe {
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          position: absolute;
        }
      `}</style>
    </span>
  ) : (
    <Anchor href={node.url} title={node.title} key={context.index}>
      {node.children.map((node, index) =>
        renderMarkdown({ ...context, index }, node)
      )}
    </Anchor>
  );

const elementsMapping: Record<MarkdownNodeType, NodeToElementMapper<any>> = {
  root: rootMap,
  paragraph: paragraphMap,
  heading: headingMap,
  list: listMap,
  listItem: listItemMap,
  image: imageMap,
  link: hyperlinkMap,
  blockquote: blockquoteMap,
  thematicBreak: hrMap,
  text: textMap,
  emphasis: emphasisMap,
  inlineCode: codeMap,
  bold: boldMap,
  strong: boldMap,
  html: htmlMap,
};

export function parseMarkdown(input: string): MarkdownNode {
  return unified().use(remarkParse).parse(input) as unknown as MarkdownNode;
}

export function renderMarkdown<T extends MappingContext>(
  context: T,
  node: MarkdownNode
): ReactNode {
  if ("children" in node) {
    node = eventuallyConvertHTMLNodes(node as MarkdownRootNode);
  }

  if (elementsMapping[node.type]) {
    return elementsMapping[node.type](context, node);
  }

  console.warn(`Unrecognized Markdown element:`, node);

  return null;
}

function eventuallyConvertHTMLNodes(rootNode: MarkdownRootNode): MarkdownNode {
  let firstHTMLNode: MarkdownHTMLNode | undefined;
  do {
    firstHTMLNode = rootNode.children.find(
      (node) => node.type === "html" && node.value.startsWith("<")
    ) as MarkdownHTMLNode;

    if (typeof firstHTMLNode !== "undefined") {
      const firstHTMLNodeIndex = rootNode.children.indexOf(firstHTMLNode);
      const htmlType = firstHTMLNode.value
        .replace(/^<(\w+)\s*[^>]*>$/i, "$1")
        .toLowerCase();
      let correspondingHTMLNode: MarkdownHTMLNode | undefined;
      let innerSameHTMLDepth = 0;

      if (firstHTMLNode.value.endsWith("/>")) {
        correspondingHTMLNode = firstHTMLNode;
      } else {
        for (
          let index = firstHTMLNodeIndex + 1;
          index < rootNode.children.length;
          index++
        ) {
          const children = rootNode.children[index];

          if (children.type === "html") {
            if (children.value === `<${htmlType}>`) {
              innerSameHTMLDepth++;
            } else if (children.value === `</${htmlType}>`) {
              if (innerSameHTMLDepth > 0) {
                innerSameHTMLDepth--;
              } else {
                correspondingHTMLNode = children;
                break;
              }
            }
            continue;
          }
        }
      }

      if (!correspondingHTMLNode) {
        throw new YError("E_NO_CORRESPONDING_NODE", htmlType);
      }

      const correspondingHTMLNodeIndex = rootNode.children.indexOf(
        correspondingHTMLNode
      );

      rootNode = {
        ...rootNode,
        children: [
          ...(firstHTMLNodeIndex
            ? rootNode.children.slice(0, firstHTMLNodeIndex)
            : []),
          {
            type: "html",
            value: firstHTMLNode.value.slice(1, -1),
            children:
              firstHTMLNodeIndex < correspondingHTMLNodeIndex - 1
                ? rootNode.children.slice(
                    firstHTMLNodeIndex + 1,
                    correspondingHTMLNodeIndex
                  )
                : [],
          },
          ...(correspondingHTMLNodeIndex < rootNode.children.length - 1
            ? rootNode.children.slice(
                correspondingHTMLNodeIndex + 1,
                rootNode.children.length
              )
            : []),
        ],
      } as MarkdownRootNode;
    }
  } while (firstHTMLNode);

  return rootNode;
}
