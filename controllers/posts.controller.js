const path = require("path");

function getPost(req, res) {
  console.log(req.url); // /
  res.sendFile(path.join(__dirname, "..", "public", "images", "점심.PNG"));
  // res.send("<div><h1>Post Title</h1><p>This is a post</p></div>");
}

module.exports = { getPost };
