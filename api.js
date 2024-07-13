const express = require("express");

const app = express();

// server




const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("sever is listening to port 3000");
});
