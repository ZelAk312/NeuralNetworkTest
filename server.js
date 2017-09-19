const express = require("express");
const app = express();
const opn = require("opn");

app.use(express.static("site"));

app.listen(8080, () => {
    opn("http://localhost:8080");
});
