import styles from "./page.module.scss";
import {
  MASTODON_ACCOUNT_ID,
  MASTODON_SERVER,
  ORGANISATION_CONTACT,
} from "../utils/constants";
import buildMetadata from "../utils/metadata";
import { Fragment } from "react";
import ContentBlock from "../components/contentBlock";
import Heading2 from "../components/h2";
import Paragraph from "../components/p";
import Strong from "../components/strong";
import Anchor from "../components/a";
import UnorderedList from "../components/ul";
import ListItem from "../components/li";
import Blockquote from "../components/blockquote";
import HorizontalRule from "../components/hr";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { parseMarkdown, renderMarkdown } from "../utils/markdown";
import type { MarkdownRootNode } from "../utils/markdown";
import Button from "@/components/button";
import { Metadata } from "next";
import Heading1 from "@/components/h1";

const htmlToMarkdown = new NodeHtmlMarkdown({});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    pathname: "/",
    title: "Blog politique d’un écologiste Douaisien",
    description:
      "Découvrez le regard de Nicolas Froidure sur la vie politique du Douaisis.",
  });
}

export default async function Page() {
  const body = (await (
    await fetch(
      `https://${MASTODON_SERVER}/api/v1/accounts/${MASTODON_ACCOUNT_ID}/statuses`,
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        }),
        mode: "cors",
        cache: "default",
      }
    )
  ).json()) as Status[];
  const toots = body
    .filter((toot) => !toot.in_reply_to_id)
    .filter((toot) => toot.content)
    .map((toot) => {
      const text = parseMarkdown(
        htmlToMarkdown.translate(toot.content)
      ) as MarkdownRootNode;

      return {
        id: toot.id,
        createdAt: toot.created_at,
        text,
        url: toot.url,
      };
    })
    .slice(0, 3);

  return (
    <ContentBlock>
      <div className={styles.douai_collectif}>
        <Heading2>
          <img
            src="https://douai-collectif.fr/images/header.svg"
            alt="Logo Douai Collectif !"
          />
          Découvrez Douai Collectif
        </Heading2>
        <Paragraph>
          Les prochaines municipales auront lieu en mars 2026. À Douai, nous
          avons constitué un groupe composé d’élu·es, militant·es et citoyen·nes
          concerné·es par la justice sociale et climatique. Ce groupe, c’est
          Douai Collectif&nbsp;! pour une ville citoyenne, écologique et
          solidaire.
        </Paragraph>
        <Paragraph className={styles.douai_collectif_p}>
          <Button
            type="link"
            href={"https://douai-collectif.fr"}
            label="Rejoignez-nous !"
            title="Suivez les municipales 2026 à Douai"
          />
        </Paragraph>
      </div>
      <Heading1>Site de Nicolas Froidure</Heading1>
      <Paragraph>
        Bienvenue sur ce site qui me sert d’aide mémoire, de tribune, d’espace
        de réflexion et de documentation de mes diverses activités militantes.
      </Paragraph>
      <Paragraph>
        C’est aussi un espace de formation pour toute personne qui souhaite en
        savoir plus sur la vie locale. J’essaie d’être le plus objectif,
        exhaustif et pédagogue possible car je suis convaincu que la
        transparence et l’ouverture d’esprit sont les clés d’un engagement
        politique réussi.
      </Paragraph>
      <Paragraph>Sur ce site, retrouvez&nbsp;:</Paragraph>
      <UnorderedList>
        <ListItem>
          <Anchor href="/blog" title="Lire mes billets de blog">
            un blog politique&nbsp;:
          </Anchor>{" "}
          j’y parle de politique locale, nationale mais aussi de sujet plus
          globaux,
        </ListItem>
        <ListItem>
          <Anchor href="/biographie" title="Lire la biographie">
            ma biographie&nbsp;:
          </Anchor>{" "}
          pour vous permettre de découvrir qui je suis et en quoi je porte une
          expérience différente des personnalités politiques usuelles,
        </ListItem>
        <ListItem>
          <Anchor
            href="/faq"
            title="Voir les réponses aux question fréquemment posées"
          >
            une <abbr></abbr>FAQ&nbsp;:
          </Anchor>{" "}
          pour répondre aux questions que vous me posez,
        </ListItem>
        <ListItem>
          <Anchor href="/agenda" title="Voir les dates de mon agenda">
            un agenda&nbsp;:
          </Anchor>{" "}
          pour connaitre les dates des divers évènements auxquels je participe.
        </ListItem>
      </UnorderedList>
      <Heading2>Rejoindre la dynamique&nbsp;!</Heading2>
      <Paragraph>
        N’hésitez pas{" "}
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
          Ensemble, remettons le réel au cœur de la politique&nbsp;!
        </Paragraph>
      </Blockquote>
      <Blockquote>
        <Paragraph className={styles.signature}>
          <img src="/images/signature.svg" alt="Signature" />
        </Paragraph>
      </Blockquote>
      <aside className={styles.toots}>
        <Heading2>Derniers messages Mastodon&nbsp;:</Heading2>
        <HorizontalRule />
        {toots.map((toot) => (
          <Fragment key={toot.id}>
            {renderMarkdown({ index: 0 }, toot.text)}
            <Paragraph>
              Publié le{" "}
              <Anchor
                href={toot.url as string}
                title="Voir le toot sur Mastodon"
              >
                {new Intl.DateTimeFormat("fr-FR", {
                  timeZone: "Europe/Paris",
                  dateStyle: "full",
                  timeStyle: "medium",
                }).format(Date.parse(toot.createdAt))}
                .
              </Anchor>
            </Paragraph>
            <HorizontalRule />
          </Fragment>
        ))}
      </aside>
    </ContentBlock>
  );
}

// Types generated with `schema2dts` via:
// https://github.com/samwightt/mastodon-openapi
type Status = NonNullable<{
  id: NonNullable<string>;
  uri: NonNullable<string>;
  created_at: NonNullable<string>;
  account: Account;
  content: NonNullable<string>;
  visibility: "public" | "unlisted" | "private" | "direct";
  sensitive: NonNullable<boolean>;
  spoiler_text: NonNullable<string>;
  media_attachements: NonNullable<Attachment[]>;
  application: Application;
  url?: NonNullable<string>;
  in_reply_to_id?: NonNullable<string>;
  in_reply_to_account_id?: NonNullable<string>;
  reblog?: Status;
  poll?: Poll;
  card?: Card;
  language?: NonNullable<string>;
  text?: NonNullable<string>;
  mentions: NonNullable<Mention[]>;
  tags: NonNullable<Tag[]>;
  emojis: NonNullable<Emoji[]>;
  reblogs_count: NonNullable<number>;
  favourites_count: NonNullable<number>;
  replies_count: NonNullable<number>;
  favourited?: NonNullable<boolean>;
  reblogged?: NonNullable<boolean>;
  muted?: NonNullable<string>;
  bookmarked?: NonNullable<string>;
  pinned?: NonNullable<string>;
}>;
type Field = NonNullable<{
  name: NonNullable<string>;
  value: NonNullable<string>;
  verified_at?: NonNullable<string>;
}>;
type Emoji = NonNullable<{
  shortcode: NonNullable<string>;
  url: NonNullable<string>;
  static_url: NonNullable<string>;
  visible_in_picker: NonNullable<boolean>;
  category?: NonNullable<string>;
}>;
type Attachment = NonNullable<{
  id: NonNullable<string>;
  url: NonNullable<string>;
  preview_url: NonNullable<string>;
  remote_url?: NonNullable<string>;
  description?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Poll = NonNullable<{
  id: NonNullable<string>;
  expires_at?: NonNullable<string>;
  expired: NonNullable<boolean>;
  multiple: NonNullable<boolean>;
  votes_count: NonNullable<number>;
  voters_count?: NonNullable<number>;
  voted?: NonNullable<boolean>;
  own_votes?: NonNullable<NonNullable<number>[]>;
  options: NonNullable<
    NonNullable<{
      title: NonNullable<string>;
      votes_count?: NonNullable<number>;
    }>[]
  >;
  emojis: NonNullable<Emoji[]>;
}>;
type Card = NonNullable<{
  url: NonNullable<string>;
  title: NonNullable<string>;
  description: NonNullable<string>;
  type: "link" | "photo" | "video" | "rich";
  author_name?: NonNullable<string>;
  author_url?: NonNullable<string>;
  provider_name?: NonNullable<string>;
  provider_url?: NonNullable<string>;
  html?: NonNullable<string>;
  width?: NonNullable<number>;
  height?: NonNullable<number>;
  image?: NonNullable<string>;
  embed_url?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Mention = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
}>;
type Tag = NonNullable<{
  name: NonNullable<string>;
  url: NonNullable<string>;
  history?: NonNullable<History[]>;
}>;
type History = NonNullable<{
  day: NonNullable<string>;
  uses: NonNullable<string>;
  accounts: NonNullable<string>;
}>;
type Account = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
  moved?: Account;
  fields?: Field;
  bot?: NonNullable<boolean>;
  suspended?: NonNullable<boolean>;
  mute_expires_at?: NonNullable<string>;
  created_at: NonNullable<string>;
  last_status_at?: NonNullable<string>;
  statuses_count: NonNullable<number>;
  followers_count: NonNullable<number>;
  following_count: NonNullable<number>;
  display_name: NonNullable<string>;
  note: NonNullable<string>;
  avatar: NonNullable<string>;
  avatar_static: NonNullable<string>;
  header: NonNullable<string>;
  header_static: NonNullable<string>;
  locked: NonNullable<boolean>;
  emojis: NonNullable<Emoji[]>;
  discoverable: NonNullable<string>;
}>;
type Application = NonNullable<{
  name: NonNullable<string>;
  website?: NonNullable<string>;
  vapid_key?: NonNullable<string>;
}>;
