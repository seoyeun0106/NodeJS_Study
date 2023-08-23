const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json());
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

app.use("/static", express.static(path.join(__dirname, "public")));
const port = 4000;
app.listen(port, () => {
  console.log("listening");
});
