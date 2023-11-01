const router = require("express").Router();

const apiTodosRouter = require("./api/todos.api.route");

router.use("/api/todos", apiTodosRouter);

module.exports = router;
