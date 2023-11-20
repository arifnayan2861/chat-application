//External imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//Internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();

//DB connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("database connection successful!"))
  .catch((error) => console.log(error));

//Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set view engine
app.set("view engine", "ejs");

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app listening to port http://localhost:${PORT}`);
});
