function getPost(req, res) {
  console.log(req.url); // /
  res.send("<div><h1>Post Title</h1><p>This is a post</p></div>");
}

module.exports = { getPost };
