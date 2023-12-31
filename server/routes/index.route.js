const router = require("express").Router();

const apiTodosRouter = require("./api/todos.api.route");
const authApiRouter = require("./api/auth.api.route");
const apiEditRouter = require("./api/edit.api.route");
const apiLevelRouter = require("./api/level.api.route");
const apiTimeRouter = require("./api/time.api.route");

router.use("/api/todos", apiTodosRouter);
router.use("/api/auth", authApiRouter);
router.use("/api/edit", apiEditRouter);
router.use("/api/level", apiLevelRouter);
router.use("/api/time", apiTimeRouter);

module.exports = router;
