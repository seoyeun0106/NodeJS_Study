const cookieParser = require("cookie-parser");
const express = require("express");
let refreshTokens = [];
const app = express();
const port = 4000;
const secretTxt = "scretTxt"; //signature 원래는 환경변수 env
const refreshSecretTxt = "refreshSecretTxt";
const jwt = require("jsonwebtoken");
// accessToken 맞는 지 점검 함수
const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //bearer [token]
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretTxt, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; //다음 미들웨어에서도 사용 가능하도록
    next();
  });
};

// accessToken 생성 함수
const createAccessToken = (user) => {
  const accessToken = jwt.sign(user, secretTxt, { expiresIn: "30s" });
  return accessToken;
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
app.use(cookieParser());
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // jwt 를 이용해서 토큰 생성
  // 유효 기간 추가
  const accessToken = createAccessToken(user);

  // jwt 이용, refresh Token 생성
  const refreshToken = jwt.sign(user, refreshSecretTxt, { expiresIn: "1d" });
  refreshTokens.push(refreshToken);

  // refreshToken을 쿠키에 넣어주기
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //XSS 공격 막기
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});
// authMiddleWare 를 통과해야만 함
app.get("/posts", authMiddleWare, (req, res) => {
  posts.push(req.user); //넘어간 user!
  res.json(posts);
});

app.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(403); //쿠키 만료 || 쿠키 미 존재
  }
  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    res.sendStatus(403); // 가지고 있는 refreshToken 중 미 존재
  }
  jwt.verify(refreshToken, refreshSecretTxt, (err, user) => {
    if (err) return res.sendStatus(403); //refresh 토큰 만료
    res.json({ accessToken: createAccessToken({ name: user.name }) });
  });
});

app.listen(port, () => {
  console.log("listening");
});
