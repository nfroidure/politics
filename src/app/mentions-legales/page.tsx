import {
  DOMAIN_NAME,
  ORGANISATION_LEGAL_NAME,
  ORGANISATION_NAME,
  ORGANISATION_ADDRESS,
  PUBLISHER,
} from "../../utils/constants";
import buildMetadata from "../../utils/metadata";
import ContentBlock from "../../components/contentBlock";
import Heading1 from "../../components/h1";
import Heading2 from "../../components/h2";
import Paragraph from "../../components/p";
import UnorderedList from "../../components/ul";
import Anchor from "../../components/a";
import ListItem from "../../components/li";

export async function generateMetadata() {
  return buildMetadata({
    pathname: "/mentions-legales",
    title: "Mentions légales",
    description: "Lire les conditions d’utilisation de ce site.",
  });
}

export default function Page() {
  return (
    <ContentBlock>
      <Heading1>Conditions générales d’utilisation</Heading1>
      <Paragraph>
        La navigation sur ce site est soumise aux présentes conditions
        d’utilisation. Les personnes qui accèdent aux informations mises à
        disposition par {ORGANISATION_NAME} sur son site Internet reconnaissent
        en avoir pris connaissance et les accepter.
      </Paragraph>
      <Heading2>Édition</Heading2>
      <Paragraph>
        Le site {DOMAIN_NAME} est édité par "{ORGANISATION_LEGAL_NAME}", sis{" "}
        {ORGANISATION_ADDRESS}. Le directeur de publication est {PUBLISHER}.
      </Paragraph>
      <Heading2>Propriété intellectuelle</Heading2>
      <Paragraph>
        Le contenu de ce site et notamment, mais non exclusivement, les textes,
        photographies, mise en page, charte graphique, marques, logos et autres
        signes distinctifs qui apparaissent dans ce site sont protégés par les
        droits de propriété intellectuelle.
      </Paragraph>
      <Paragraph>
        Toute reproduction, représentation, modification, publication,
        transmission, dénaturation totale ou partielle du site ou de son
        contenu, par quelque procédé que ce soit, et sur quelque support que ce
        soit est interdite sauf accord express du directeur de publication.
      </Paragraph>
      <Paragraph>
        Toute exploitation non autorisée du site ou de son contenu, des
        informations qui y sont divulguées, engagerait la responsabilité de
        l’utilisateur et constituerait une contrefaçon sanctionnée par les
        articles L 335-2 et suivants du Code de la Propriété Intellectuelle. Il
        en est de même des bases de données figurant, le cas échéant, sur le
        site {DOMAIN_NAME}
        qui sont protégées par les dispositions de la loi du 1er juillet 1998
        portant transposition dans le Code de la Propriété Intellectuelle de la
        Directive Européenne du 11 mars 1996 relative à la protection juridique
        des bases de données.
      </Paragraph>
      <Paragraph>
        A ce titre, toute reproduction ou extraction engagerait la
        responsabilité de l’utilisateur.
      </Paragraph>
      <Heading2>Contenu du site</Heading2>
      <Paragraph>
        Malgré tous le soin apporté à la réalisation de ce site et à son
        actualisation régulière, des erreurs peuvent s’être glissées dans les
        informations et/ou documents présentés. Les utilisateurs du site
        procéderont donc à toutes vérifications utiles. {ORGANISATION_NAME}{" "}
        pourra à tout moment, sans préavis, apporter des améliorations ou des
        changements aux programmes ou aux services décrits sur ce site.
      </Paragraph>
      <Paragraph>
        {ORGANISATION_NAME} décline toute responsabilité en cas de difficulté
        d’accès à son site ou d’interruptions dans la connexion quelles qu’en
        soient les causes.
      </Paragraph>
      <Paragraph>
        De plus, {ORGANISATION_NAME} ne saurait être tenu responsable d’un
        dommage ou virus qui pourrait infecter votre ordinateur ou tout matériel
        informatique, suite à une utilisation ou accès au site ou téléchargement
        provenant de ce site.
      </Paragraph>
      <Heading2>Liens hypertextes et références</Heading2>
      <Paragraph>
        Le site {DOMAIN_NAME} donne accès à d’autres sites via des liens
        hypertextes, notamment dans les rubriques Crédits et Annuaire. N’étant
        pas les gestionnaires de ces sites, nous ne pouvons pas en contrôler le
        contenu. En conséquence, nous ne pourrons en aucun cas être tenus pour
        responsables du contenu des sites ainsi accessibles, ou des éventuelles
        collectes et transmissions de données personnelles, installation de
        cookies ou tout autre procédé tendant aux mêmes fins, effectués par ces
        sites.
      </Paragraph>
      <Paragraph>
        Tout site public ou privé est autorisé à établir, sans autorisation
        préalable, un lien vers le site {DOMAIN_NAME} à condition&nbsp;:
      </Paragraph>
      <UnorderedList>
        <ListItem>
          que les pages de {DOMAIN_NAME} ne soient pas imbriquées à l’intérieur
          des pages d’un autre site, notamment à l’intérieur de frames ou de
          cadres,
        </ListItem>
        <ListItem>
          de n’utiliser à l’intérieur de la balise &lt;a&gt; ainsi qu’à
          l’intérieur de la balise &lt;title&gt; que des mots en rapport direct
          avec le contenu de ce site et/ou de la page pointée en particulier.
        </ListItem>
      </UnorderedList>
      <Heading2>Données personnelles</Heading2>
      <Paragraph>
        Ce site Internet ne fait pas usage de cookie ni d’un quelconque outil de
        comptage/suivi de son trafic.
      </Paragraph>
      <Paragraph>
        Vous pouvez, si vous le souhaitez, vous abonner à la lettre
        d’information. Dans ce cas, vos données seront enregistrées et
        conservées par mes soins et vous pourrez à tout moment vous en
        désincrire par simple retour de mail.
      </Paragraph>
      <Paragraph>
        Vous disposez d’un droit de modification et/ou de suppression de vos
        données personnelles ainsi collectées conformément à la loi en vigueur.
      </Paragraph>
      <Heading2>Crédits</Heading2>
      <Paragraph>
        Site entièrement réalisé par mes soins, le code source est{" "}
        <Anchor
          href="https://github.com/nfroidure/politics"
          title="Voir le dépôt du site"
          target="_blank"
        >
          accessible à toutes et tous
        </Anchor>
        .
      </Paragraph>
    </ContentBlock>
  );
}
