const router = require("express").Router();
const { Todo } = require("../../db/models");

router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = await Todo.create({
      title,
      description,
      status,
      player_id: req.session.user_id,
    });
    res.json({
      message: "success",
      todo,
    });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
