const axios = require("axios");
const http = require("http");
const port = 4000;
const targetObject = { a: "a", b: "b" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/home") {
    req.on("data", (data) => {
      console.log(data);
      const stringifiedData = String(data);
      console.log(stringifiedData);
      Object.assign(targetObject, JSON.parse(stringifiedData));
    });
  } else {
  }
  if (req.url === "/home") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    console.log("다시 또 댜시ㅣ");
    // 얘는 오ㅐ 다시,,?
    res.end(JSON.stringify(targetObject));
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
    <body>
        <h2>hi</h2>
    </body>
</html>`);
    res.end();
  } else {
    res.statusCode = 400;
    res.end();
  }
});

server.listen(port, () => {
  console.log("Listening on port", port);
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>hi</h1>");
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

// const axios = require("axios");
// let data;

// axios
//   .get("https://naver.com")
//   .then((res) => {
//     const date = res.headers.date;
//     console.log(new Date(date).toLocaleTimeString());
//   })
//   .catch((err) => console.log(err));
