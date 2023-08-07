const express = require("express"); //status 코드 알아서 처리 해줌
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const PORT = "3000";
const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.listen(PORT);

// express : status code 자동으로 설정, 단 sendStatus로 바꿀 수 있는 듯함
// response 의 Content Type header 설정하지 않아도 됨. 형식이 뭔지 자동으로 알려줌.

// res.json과 res.send의 차이
// 결과는 차이가 없음.
// JSON는 obj를 먼저 문자화 stringify 로 변환을 해줌. Content-Type이 없을 경우 세팅, 이후 바디 전달.
// send에는 타입을 먼저 체크를 해주고, Object일 경우, JSON호출해줌. 그리고 다시 send. 오마이갓.

// res send와 end의 차이..

// res end 써서 세션 종료, res send나 json은 알아서 세션 종료해줌.
// 컨텐츠를 넣어서 보내줄 숭 있어
// res end가 없는 E tag라는 건 리소스의 특정 버전에 대한 식별자
