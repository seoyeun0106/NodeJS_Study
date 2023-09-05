const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const User = require("./models/users.model");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const cookieEncryptionKey = ["supersecret-key"];
app.use(
  // 쿠키이름 기본 값은 express:sess
  cookieSession({
    keys: [cookieEncryptionKey],
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
// POST 로 들어온 form 값은 URL-encoded 형식으로 들어오고 객체로 변환해야한다.
// 객체로 변환할 때 중첩 객체를 허용하느냐 마느냐 ! //근데 오 ㅐ허용 안 해?????
// default 값을 사용하지 않는 이유?
app.use(
  express.urlencoded({
    extended: false, //qs|| query-string 사용 시 중첩된 객체를 허용하지 않는다
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect()
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/login", (req, res) => {
  console.log("들어옴");
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  //user 객체를 생성합니다.
  try {
    const user = new User(req.body); //password랑 request 들어있는 body
    // user 컬렉션에 유저를 저장합니다.
    await user.save();
    console.log(user, "저장되었습니다.");
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
  }
});
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ msg: info });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
    });
  })(req, res, next);
});
app.use("/static", express.static(path.join(__dirname, "public")));
const port = 4000;
app.listen(port, () => {
  console.log("listening");
});
