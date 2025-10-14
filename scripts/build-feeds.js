// scripts/build-feeds.js
const fs = require("fs");
const path = require("path");
const { buildFeeds } = require("../feed");

(async () => {
  const outDir = path.join(process.cwd(), "dist");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const { rss, json } = await buildFeeds();
  fs.writeFileSync(path.join(outDir, "feed.xml"), rss);
  fs.writeFileSync(path.join(outDir, "feed.json"), json);
  console.log("Feeds built: dist/feed.xml, dist/feed.json");
})();
