function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(encryptedData, `is being sent to ${url}`);
}

function encrypt(data) {
  return "data";
}

module.exports = {
  send,
};
