const express = require("express"); //status 코드 알아서 처리 해줌
const usersRouter = express.Router();
const {
  postUser,
  getUser,
  getUsers,
} = require("../controllers/users.controller");
usersRouter.post("/", postUser);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);

module.exports = usersRouter;
