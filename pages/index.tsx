import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Heading1 from "../components/h1";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Strong from "../components/strong";
import Anchor from "../components/a";
import UnorderedList from "../components/ul";
import ListItem from "../components/li";
import {
  CSS_BREAKPOINT_START_L,
  ORGANISATION_CONTACT,
} from "../utils/constants";
import Blockquote from "../components/blockquote";

const Page = () => {
  return (
    <Layout title="Blog politique de Nicolas Froidure, écologiste">
      <ContentBlock>
        <Heading1>
          Bienvenue sur le site Internet de
          <br /> Nicolas Froidure
        </Heading1>
        <Paragraph>
          Lassé de constater l'inaction des personnalités politiques classiques,
          j'ai décidé de ne plus être spectateur de la vie politique, mais au
          contraire de m'engager{" "}
          <Strong>pour que l'écologie soit enfin mise en oeuvre&nbsp;!</Strong>
        </Paragraph>
        <Paragraph>
          C'est donc naturellement que j'ai créé ce site pour vous permettre de
          mieux connaître mon engagement et vous tenir informé·es de mon
          actualité.
        </Paragraph>
        <Heading2>Sur ce site, retrouvez&nbsp;:</Heading2>
        <UnorderedList>
          <ListItem>
            <Anchor href="/blog">Un blog politique&nbsp;:</Anchor> j'y parle de
            politique locale, nationale mais aussi de sujet plus globaux,
          </ListItem>
          <ListItem>
            <Anchor href="/biographie">Ma biographie&nbsp;:</Anchor> pour vous
            permettre de découvrir qui je suis et en quoi je porte une
            expérience différente des personnalités politiques usuelles,
          </ListItem>
          <ListItem>
            <Anchor href="/faq">Une FAQ&nbsp;:</Anchor> pour répondre aux
            questions que vous me posez.
          </ListItem>
        </UnorderedList>
        <Heading2>Rejoindre la dynamique&nbsp;!</Heading2>
        <Paragraph>
          N'hésitez pas{" "}
          <Anchor
            href={`mailto:${ORGANISATION_CONTACT}`}
            title="Contacter Nicolas Froidure"
          >
            à me contacter
          </Anchor>{" "}
          pour construire, avec moi, le renouveau politique dans le Douaisis et
          porter les enjeux climatiques et sociaux auxquels nous devons faire
          face.
        </Paragraph>
        <Blockquote>
          <Paragraph>
            Ensemble, remettons le réel au coeur de la politique !
          </Paragraph>
        </Blockquote>
      </ContentBlock>
      <style jsx>{`
        :global(p.photo) {
          text-align: center;
        }
        :global(.light) {
          color: var(--light) !important;
          text-align: center !important;
        }
        img {
          width: 100%;
        }
        .nobr {
          white-space: nowrap;
        }
        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          .content {
            flex-direction: row;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Page;
