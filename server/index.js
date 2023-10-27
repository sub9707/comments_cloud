const express = require("express");
const mydb = require("./config/db");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const tokenRouter = require("./routes/token");
const usercontroller = require("./controllers/UserController");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/token", tokenRouter);
app.get("/users", usercontroller.getalluser);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
