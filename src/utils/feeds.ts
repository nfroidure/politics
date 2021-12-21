export type FeedDescription = {
  sourceURL: string;
  title: string;
  description: string;
  url: string;
  updatedAt: string;
  builtAt: string;
};

export type FeedItem = {
  title: string;
  description: string;
  url: string;
  updatedAt: string;
  publishedAt: string;
};

export async function generateAtomFeed(
  informations: FeedDescription,
  items: FeedItem[]
) {
  return `<?xml version="1.0" encoding="utf-8"?>

<feed xmlns="http://www.w3.org/2005/Atom">    
  <id>${informations.sourceURL}</id>
  <title>${informations.title}</title>
  <subtitle>${informations.description}</subtitle>
  <link href="${informations.url}" rel="self" type="application/atom+xml" />
  <link href="${informations.sourceURL}" rel="alternate" type="text/html" />
  <updated>${informations.updatedAt}</updated>${items
    .map(
      (item) => `
  <entry>
    <id>${item.url}</id>
    <title>${item.title}</title>
    <link href="${item.url}" rel="alternate" type="text/html" />
    <updated>${item.updatedAt}</updated>
    <published>${item.publishedAt}</published>
    <summary>${item.description}</summary>
  </entry>`
    )
    .join("")}
</feed>
`;
}

export async function generateRSSFeed(
  informations: FeedDescription,
  items: FeedItem[]
) {
  return `<?xml version="1.0" encoding="UTF-8" ?>

<rss version="2.0">
  <channel>
    <title>${informations.title}</title>
    <description>${informations.description}</description>
    <link>${informations.sourceURL}</link>
    <lastBuildDate>${informations.updatedAt}</lastBuildDate>
    <pubDate>${informations.builtAt}</pubDate>
    <ttl>1800</ttl>${items.map(
      item =>`
      <item>
        <title>${item.title}</title>
        <description>${item.description}</description>
        <link>${item.url}</link>
        <pubDate>${item.publishedAt}</pubDate>
      </item>`
    ).join('')}
  </channel>
</rss>`;
}
