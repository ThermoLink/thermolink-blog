// posts.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter"); // npm i gray-matter

const postsDir = path.join(process.cwd(), "posts");

const getPosts = async () => {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      content, // markdown (optionally render to HTML later)
    };
  });
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
};

module.exports = { getPosts };
