import { env } from "node:process";
import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { parse } from "yaml";
import { DOMAIN_NAME, MASTODON_SERVER } from "../src/utils/constants";
import { toASCIIString } from "../src/utils/ascii";

const execAsync = promisify(exec);

run();

async function run() {
  if (!env.MASTODON_ACCESS_TOKEN) {
    console.error("💥 - No Mastodon token provided");
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

  for (const post of posts) {
    const metadata = parse(
      (await readFile(post)).toString().split(/\-\-\-/gm)[1]
    );

    if (!metadata.draft) {
      const url = `https://${DOMAIN_NAME}/blog/${
        metadata.leafname || toASCIIString(metadata.title)
      }`;

      const body = {
        status: `[Blog] ${metadata.title}\n${url}\n${metadata.tags
          .map((tag: string) => `#${tag}`)
          .join(" ")}`,
        media_ids: [],
        language: "fr",
        visibility: "public",
        // Let's schedule it a bit later to avoid tooting
        // before the deployment is completed
        scheduled_at: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
      };

      const response = await fetch(
        `https://${MASTODON_SERVER}/api/v1/statuses`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${env.MASTODON_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "Idempotency-Key": Buffer.from(url).toString("base64"),
          }),
          mode: "cors",
          cache: "default",
          body: JSON.stringify(body),
        }
      );

      if (response.status === 200) {
        console.warn(`✅ - Toot is on its way for: ${url}`);
      } else {
        console.error(`☢️ - Toot could not be sent: ${url}`, response.status);
      }
    }
  }
}
