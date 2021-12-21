import { writeFile } from "fs";
import { promisify } from "util";
import { join as joinPath } from "path";
import { getStaticProps } from "../pages/blog/index";
import { generateAtomFeed, generateRSSFeed } from "./feeds";
import { publicRuntimeConfig } from "./config";
import { DOMAIN_NAME, ORGANISATION_NAME } from "./constants";
import type { FeedDescription, FeedItem } from "./feeds";

const doWriteFile = promisify(writeFile);

const OUT_DIR = joinPath(__dirname, "..", "out");
const baseURL = publicRuntimeConfig.baseURL;
const builtAt = new Date().toISOString();

export async function buildAssets() {
  await Promise.all([
    doWriteFile(joinPath(OUT_DIR, "CNAME"), DOMAIN_NAME),
    doWriteFile(joinPath(OUT_DIR, ".nojekyll"), ""),
    (async () => {
      const result = await getStaticProps({});

      if ("props" in result) {
        const {
          props: { title, description, entries },
        } = result;
        const feedItems = entries.map((entry) => ({
          title: entry.title,
          description: entry.description,
          url: baseURL + "/blog/" + entry.id,
          updatedAt: entry.date,
          publishedAt: entry.date,
        }));
        const commonDescription: Omit<FeedDescription, "url"> = {
          title: `${title} - ${ORGANISATION_NAME}`,
          sourceURL: baseURL + "/blog",
          description,
          updatedAt: new Date(
            entries.reduce(
              (higherTimestamp, entry) =>
                Math.max(higherTimestamp, Date.parse(entry.date)),
              0
            )
          ).toISOString(),
          builtAt,
        };

        await Promise.all([
          buildAtomFeed(commonDescription, feedItems),
          buildRSSFeed(commonDescription, feedItems),
        ]);
      }
    })(),
  ]);
}

async function buildAtomFeed(
  commonDescription: Omit<FeedDescription, "url">,
  feedItems: FeedItem[]
) {
  const content = await generateAtomFeed(
    {
      ...commonDescription,
      url: baseURL + "/blog.atom",
    },
    feedItems
  );

  doWriteFile(joinPath(OUT_DIR, "public", "blog.atom"), content);
}

async function buildRSSFeed(
  commonDescription: Omit<FeedDescription, "url">,
  feedItems: FeedItem[]
) {
  const content = await generateRSSFeed(
    {
      ...commonDescription,
      url: baseURL + "/blog.rss",
    },
    feedItems
  );

  doWriteFile(joinPath(OUT_DIR, "public", "blog.rss"), content);
}
