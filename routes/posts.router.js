const express = require("express"); //status 코드 알아서 처리 해줌
const { getPost } = require("../controllers/posts.controller");

const postsRouter = express.Router();
postsRouter.get("/", getPost);

module.exports = postsRouter;
