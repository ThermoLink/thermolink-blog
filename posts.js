// posts.js
const fs = require("fs");
const path = require("path");

const postsDirectory = path.join(__dirname, "posts");

const getPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { title, date, excerpt, content } = JSON.parse(fileContents);
    const slug = fileName.replace(/\.json$/, "");
    return { title, date, excerpt, content, slug };
  });
  return posts;
};

module.exports = { getPosts };
