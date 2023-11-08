require("@babel/register");
require("dotenv").config();
const express = require("express");
const serverConfig = require("./config/serverConfig");

const app = express();

const indexRouter = require("./routes/index.route");

serverConfig(app);

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на ${PORT} порту`));
