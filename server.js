const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const mailRoute = require("./routes/mailRoute");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
// const date = new Date(2021, 06, 26, 5, 03, 0);
// console.log(date);

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 2001;

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/flipr", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", function () {
  console.log("mongo db connected");
});

mongoose.set("useFindAndModify", false);

app.use("/api", userRouter);

app.use("/api", mailRoute);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", function (req, res) {
  res.send("Server started");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
