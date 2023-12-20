const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const tokenRouter = require("./routes/token");
const noticeRouter = require("./routes/notice");
const userController = require("./controllers/UserController");
const errorRouter = require("./routes/errors");
const boardRouter = require("./routes/board");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const corsOptions = {
  origin: "https://comments-cloud-sub9707.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.get("/users", userController.getalluser);
app.use("/token", tokenRouter);
app.use("/notice", noticeRouter);
app.use("/error", errorRouter);
app.use("/board", boardRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
