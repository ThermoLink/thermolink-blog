// feed.js
const { Feed } = require("feed");
const { getPosts } = require("./posts");

async function buildFeeds() {
  const siteUrl = "https://thermolinksensors.com"; // main site
  const blogUrl = "https://blog.thermolink.dev"; // where feeds will be hosted (set this)
  const posts = await getPosts();

  const feed = new Feed({
    id: blogUrl,
    link: blogUrl,
    title: "ThermoLink Blog",
    description: "Latest posts from ThermoLink",
    language: "en",
  });

  posts.forEach((p) => {
    const url = `${siteUrl}/blog/${p.slug}`;
    feed.addItem({
      id: url,
      link: url,
      title: p.title,
      description: p.excerpt,
      content: p.content, // raw md or rendered html if you prefer
      date: new Date(p.date),
    });
  });

  return {
    rss: feed.rss2(),
    json: feed.json1(),
  };
}

module.exports = { buildFeeds };
