const express = require("express");
const app = express();
const port = 4000;
const secretTxt = "scretTxt"; //signature 원래는 환경변수 env
const jwt = require("jsonwebtoken");
const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretTxt, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user; //다음 미들웨어에서도 사용 가능하도록
    next();
  });
};
const posts = [
  {
    username: "John",
    title: "Post 1",
  },
  {
    username: "seoyeun",
    title: "Post 2",
  },
];
app.use(express.json());
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt 를 이용해서 토큰 생성
  const accessToken = jwt.sign(user, secretTxt);
  console.log(accessToken);
  res.json({ accessToken });

  //   {
  //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImlhdCI6MTY5MjI1NTk4M30.dejmxIrN5vx9GfvvFIp2lZeDq-V4-cEUvTcXhUnBRtI"
  // }
});
// authMiddleWare 를 통과해야만 함
app.get("/posts", authMiddleWare, (req, res) => {
  posts.push(req.user); //넘어간 user!
  res.json(posts);
});
// app.use("/auth", authMiddleWare);
app.listen(port, () => {
  console.log("listening");
});
