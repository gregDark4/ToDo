require("dotenv").config();
const express = require("express");
const serverConfig = require("./config/serverConfig");

const app = express();

const PORT = 4000;
serverConfig(app);
const indexRoute = require("./routes/index.route");

app.use("/", indexRoute);

app.listen(PORT, () => console.log(`наш сервер пашет на ${PORT}  порту`));
