const { users } = require("../models/users.model");

function getUsers(req, res) {
  res.send(users);
}

function getUser(req, res) {
  console.log(req.url);
  const param = req.params.id;
  const query = req.query;
  const user = users[param];
  if (user) {
    res.json(user.name);
  } else {
    res.sendStatus(400);
  }
}

function postUser(req, res) {
  const newUser = {
    name: req.body.name,
    id: users.length,
  };
  users.push(newUser);
  res.json(newUser);
}

module.exports = {
  getUser,
  getUsers,
  postUser,
};
