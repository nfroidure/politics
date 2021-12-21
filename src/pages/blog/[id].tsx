import Layout from "../../layouts/main";
import ContentBlock from "../../components/contentBlock";
import Paragraph from "../../components/p";
import Anchor from "../../components/a";
import Share from "../../components/share";
import { DOMAIN_NAME } from "../../utils/constants";
import { getStaticProps as baseGetStaticProps } from ".";
import { fixText } from "../../utils/text";
import { renderMarkdown } from "../../utils/markdown";
import type { Entry } from ".";
import type { GetStaticProps, GetStaticPaths } from "next";

type Params = { id: string };
type Props = { entry: Entry };

const BlogPost = ({ entry }: Props) => {
  return (
    <Layout
      title={`${fixText(entry.title)}`}
      description={fixText(entry.description)}
      image={entry.illustration?.url}
    >
      <ContentBlock>
        {renderMarkdown({ index: 0 }, entry.content)}
        <div className="clear"></div>
        <Share
          url={`https://${DOMAIN_NAME}/blog/${entry.id}`}
          title={entry.title}
        />
        <Paragraph>
          <Anchor href="/blog">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
      <style jsx>{`
        :global(p.illustration) {
          float: left;
          width: var(--block);
          margin: 0 var(--gutter) 0 0;
        }
        img {
          width: 100%;
          margin: 0;
        }
        .clear {
          clear: both;
        }
      `}</style>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await baseGetStaticProps({});

  if ("props" in result) {
    const paths = result.props.entries.map((entry) => ({
      params: { id: entry.id },
    }));

    return { paths, fallback: false };
  }
  throw Error('E_BAD_PROPS');
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const result = await baseGetStaticProps({});

  if ("props" in result) {
    return {
      props: {
        entry: result.props.entries.find(
          ({ id }) => id === (params || {}).id
        ) as Entry,
      },
    };
  }
  throw Error('E_BAD_PROPS');
};
