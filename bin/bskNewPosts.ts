import { env } from "node:process";
import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { parse } from "yaml";
import {
  DOMAIN_NAME,
  BLUESKY_ACCOUNT,
  BLUESKY_SERVER,
  LOCALE,
} from "../src/utils/constants";
import { toASCIIString } from "../src/utils/ascii";

const execAsync = promisify(exec);

run();

async function run() {
  if (!env.BLUESKY_PASSWORD) {
    console.error("💥 - No Bluesky password provided");
  }

  const result = await execAsync(
    `git diff --summary HEAD~1 HEAD -- contents/blog`
  );
  const posts = result.stdout
    .trim()
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((s) => s.trim())
        .filter((id) => id)
    )
    .filter((row) => row[0] === "create")
    .map((row) => row[3]);

  if (!posts.length) {
    console.warn("🤷 - No new blog posts to share");
    return;
  }

  const identifier = `${BLUESKY_ACCOUNT}.${BLUESKY_SERVER}`;
  const url = `https://${BLUESKY_SERVER}/xrpc/com.atproto.server.createSession`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    cache: "default",
    body: JSON.stringify({
      identifier,
      password: env.BLUESKY_PASSWORD,
    }),
  });

  if (response.status === 200) {
    console.warn(`✅ - Logged in as: ${identifier}`);
  } else {
    console.error(
      `☢️ - Could not log in as: ${identifier} (${url})`,
      response.status,
      await response.json()
    );
    process.exit(1);
  }

  const token = (await response.json())?.accessJwt;

  for (const post of posts) {
    const metadata = parse(
      (await readFile(post)).toString().split(/\-\-\-/gm)[1]
    );

    if (!metadata.draft) {
      const url = `https://${DOMAIN_NAME}/blog/${
        metadata.leafname || toASCIIString(metadata.title)
      }`;
      const encoder = new TextEncoder();
      const prefix = "[Blog] ";
      const body = {
        repo: identifier,
        collection: "app.bsky.feed.post",
        record: {
          text: `${prefix}${metadata.title}\n${metadata.tags
            .map((tag: string) => `#${tag}`)
            .join(" ")}`,
          langs: [LOCALE],
          facets: [
            {
              index: {
                byteStart: encoder.encode(prefix).length,
                byteEnd:
                  encoder.encode(prefix).length +
                  encoder.encode(metadata.title).length,
              },
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: url,
                },
              ],
            },
            ...metadata.tags.map((tag: string, index: number) => {
              const byteStart =
                encoder.encode(prefix + metadata.title + "\n").length +
                metadata.tags
                  .slice(0, index)
                  .reduce(
                    (length: number, tag: string) =>
                      length + encoder.encode(`#${tag} `).length,
                    0
                  );

              return {
                index: {
                  byteStart,
                  byteEnd: byteStart + encoder.encode(`#${tag}`).length,
                },
                features: [
                  {
                    $type: "app.bsky.richtext.facet#tag",
                    tag,
                  },
                ],
              };
            }),
          ],
          createdAt: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
        },
      };
      
      const response = await fetch(
        `https://${BLUESKY_SERVER}/xrpc/com.atproto.repo.createRecord`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Content-Encoding": "utf8",
          }),
          mode: "cors",
          cache: "default",
          body: JSON.stringify(body),
        }
      );

      if (response.status === 200) {
        console.warn(`✅ - Post is on its way for: ${url}`);
      } else {
        console.error(
          `☢️ - Post could not be sent: ${url}`,
          response.status,
          await response.json()
        );
      }
    }
  }
}
