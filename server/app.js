require("@babel/register");
require("dotenv").config();
const path = require("path");
const express = require("express");
const serverConfig = require("./config/serverConfig");

const app = express();

const indexRouter = require("./routes/index.route");

serverConfig(app);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/", indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на ${PORT} порту`));
