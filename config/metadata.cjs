const {
  author,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: "Get HTML With Shadow Roots",
  namespace: "https://github.com/ryn-cx/get-html-with-shadow-roots",
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: ["*://*/*"],
  grant: ["GM.registerMenuCommand", "GM.setClipboard", "GM.notification"],
  noframes: "",
  "run-at": "document-end",
};
