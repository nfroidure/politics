import { env } from "node:process";
import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { parse } from "yaml";
import {
  DOMAIN_NAME,
  BLUESKY_ACCOUNT,
  BLUESKY_SERVER,
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

  const response = await fetch(
    `https://${BLUESKY_SERVER}/xrpc/com.atproto.server.createSession`,
    {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      cache: "default",
      body: JSON.stringify({
        identifier: BLUESKY_ACCOUNT,
        password: env.BLUESKY_PASSWORD,
      }),
    }
  );
  const token = (await response.json())?.body?.accessJwt;

  for (const post of posts) {
    const metadata = parse(
      (await readFile(post)).toString().split(/\-\-\-/gm)[1]
    );

    if (!metadata.draft) {
      const url = `https://${DOMAIN_NAME}/blog/${
        metadata.leafname || toASCIIString(metadata.title)
      }`;

      const prefix = "[Blog] ";
      const body = {
        repo: BLUESKY_ACCOUNT,
        collection: "app.bsky.feed.post",
        record: {
          text: `[Blog] ${metadata.title}\n${metadata.tags
            .map((tag: string) => `#${tag}`)
            .join(" ")}`,
          facets: [
            {
              index: {
                byteStart: prefix.length,
                byteEnd: prefix.length + metadata.title.length,
              },
              features: [
                {
                  $type: "app.bsky.richtext.facet#link",
                  uri: url,
                },
              ],
            },
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
          }),
          mode: "cors",
          cache: "default",
          body: JSON.stringify(body),
        }
      );

      if (response.status === 200) {
        console.warn(`✅ - Post is on its way for: ${url}`);
      } else {
        console.error(`☢️ - Post could not be sent: ${url}`, response.status);
      }
    }
  }
}
