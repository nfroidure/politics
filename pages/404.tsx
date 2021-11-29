import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Paragraph from "../components/p";
import UnorderedList from "../components/ul";
import ListItem from "../components/li";
import Anchor from "../components/a";

const Page = () => (
  <Layout title="Page non-trouvée">
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
      <Paragraph>
        Laissez-moi vous suggérer quelques lectures sur ce site&nbsp;:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          <Anchor href="/blog/c-est-decide--je-m-engage-en-politique">
            les raisons de mon engagement en politique
          </Anchor>
          ,
        </ListItem>
        <ListItem>
          <Anchor href="/biographie">ma biographie&nbsp;:</Anchor> pour mieux me
          connaitre (attention, version longue 😉).
        </ListItem>
      </UnorderedList>
    </ContentBlock>
  </Layout>
);

export default Page;
