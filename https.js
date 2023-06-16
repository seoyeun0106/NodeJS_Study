const request = require("./request");
const response = require("./response");

function makeRequest(url, data) {
  //요청 보내기
  //데이터 리턴하기
  request.send(url, data);
  return response.read();
}

const resData = makeRequest("https://naver.com", "daata data");
console.log(resData);
