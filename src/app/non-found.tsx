import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Paragraph from "../components/p";
import UnorderedList from "../components/ul";
import ListItem from "../components/li";
import Anchor from "../components/a";
import buildMetadata from "../utils/metadata";

export async function generateMetadata() {
  return buildMetadata({
    pathname: "/404",
    title: "Page non-trouvée",
    description: "La page que vous recherchez semble inexistante.",
  });
}

export default function Page() {
  return (
    <ContentBlock>
      <Heading1>Ooops!</Heading1>
      <Paragraph>La page que vous recherchez n’existe pas ou plus.</Paragraph>
      <Paragraph>
        Laissez-moi vous suggérer quelques lectures sur ce site&nbsp;:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          <Anchor
            href="/blog/c-est-decide-je-m-engage-en-politique"
            title="Lire l'article fondateur"
          >
            les raisons de mon engagement en politique
          </Anchor>
          ,
        </ListItem>
        <ListItem>
          <Anchor href="/biographie" title="Lire la biographie">
            ma biographie&nbsp;:
          </Anchor>{" "}
          pour mieux me connaitre (attention, version longue 😉).
        </ListItem>
      </UnorderedList>
    </ContentBlock>
  );
}
