require("@babel/register");
const express = require("express");
const config = require("./config/serverConfig");

const app = express();

const indexRouter = require("./routes/index.route");

config(app);

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер работает на ${PORT} порту`));
