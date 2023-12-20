const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const tokenRouter = require("./routes/token");
const noticeRouter = require("./routes/notice");
const usercontroller = require("./controllers/UserController");
const errorRouter = require("./routes/errors");
const boardRouter = require("./routes/board");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();

// const corsOptions = {
//   origin: "https://comments-cloud-dqlhu8js6-sub9707.vercel.app",
//   credentials: true,
// };

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.get("/users", usercontroller.getalluser);
app.use("/token", tokenRouter);
app.use("/notice", noticeRouter);
app.use("/error", errorRouter);
app.use("/board", boardRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
