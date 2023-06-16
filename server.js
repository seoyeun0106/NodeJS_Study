// const http = require("http");
// const port = 5000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>hi</h1>");
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

const axios = require("axios");
let data;

axios
  .get("https://naver.com")
  .then((res) => {
    const date = res.headers.date;
    console.log(new Date(date).toLocaleTimeString());
  })
  .catch((err) => console.log(err));
