const express = require("express");
const mydb = require("./config/db");
const route = require("./routes/router");
const bodyparser = require("body-parser");
const cors = require("cors");
const tokenRouter = require("./routes/token");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(route);
app.use("/token", tokenRouter);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
