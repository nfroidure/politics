import Heading2 from "./h2";
import Paragraph from "./p";
import Anchor from "./a";
import Img from "./img";
import { Item } from "../utils/items";
import { CSS_BREAKPOINT_START_L } from "../utils/constants";

const Items = <T extends Item>({
  entries,
  base,
}: {
  entries: T[];
  base: string;
}) => {
  return (
    <div className="entries">
      {entries.map((entry) => (
        <div className="entry_item" key={entry.id}>
          {entry.illustration ? (
            <p className="entry_illustration">
              <Anchor href={`${base}${entry.id}`}>
                <Img
                  float="left"
                  orientation="landscape"
                  src={"/" + entry.illustration.url}
                  alt={entry.illustration.alt}
                />
              </Anchor>
            </p>
          ) : null}
          <Heading2 className="entry_title">
            <Anchor href={`${base}${entry.id}`} className="no_underline">
              {entry.title}
            </Anchor>
          </Heading2>
          <Paragraph className="entry_description">
            {entry.description}{" "}
            <Anchor href={`${base}${entry.id}`}>Lire la suite</Anchor>
          </Paragraph>
          <div className="clear"></div>
        </div>
      ))}

      <style jsx>
        {`
          :global(.entry_title) {
            margin-top: 0 !important;
          }
          :global(.entry_title a) {
            text-decoration: none !important;
          }
          :global(.entry_illustration) {
            margin: 0 !important;
          }
          :global(.entry_description) {
            margin: 0 !important;
          }
          .entry_item {
            padding: var(--vRythm) 0;
            border-bottom: var(--border) solid var(--secondary);
          }
          .entry_item:first-child {
            padding: 0 0 var(--vRythm) 0;
          }
          .entry_item:last-child {
            border: none;
            padding: var(--vRythm) 0 0 0;
          }

          @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
            .clear {
              clear: left;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Items;
