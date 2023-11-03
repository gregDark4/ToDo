const router = require("express").Router();

const apiTodosRouter = require("./api/todos.api.route");
const authApiRouter = require("./api/auth.api.route");

router.use("/api/todos", apiTodosRouter);
router.use("/api/auth", authApiRouter);

module.exports = router;
