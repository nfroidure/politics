import Paragraph from "./p";
import Anchor from "./a";
import { ORGANISATION_CONTACT, TWITTER_ACCOUNT } from "../utils/constants";

export default function Share({
  url,
  title,
}: {
  url: string;
  title: string;
}): JSX.Element {
  return (
    <Paragraph>
      <Anchor
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        title="Commenter sur Facebook"
        target="_blank"
      >
        <span className="icon facebook" />
        Facebook
      </Anchor>
      {" - "}
      <Anchor
        href={`https://twitter.com/intent/tweet/?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}&via=${TWITTER_ACCOUNT}`}
        title="Commenter sur Twitter"
        target="_blank"
      >
        <span className="icon twitter" />
        Twitter
      </Anchor>
      {" - "}
      <Anchor
        href={`mailto:${ORGANISATION_CONTACT}`}
        title="Me répondre par courriel"
        target="_blank"
      >
        <span className="icon mail" />
        Courriel
      </Anchor>
    </Paragraph>
  );
}
