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
      // player_id: req.session.user_id,
    });
    res.json({
      message: "success",
      todo,
    });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description } = req.body;
    const [result] = await Todo.update(
      { title, description },
      { where: { id: todoId, user_id: req.session.user_id } }
    );
    if (result > 0) {
      res.json({ message: "success" });
      return;
    }
    res.json({ message: "false" });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const result = await Todo.destroy({
      where: { id: todoId, user_id: req.session.user_id },
    });
    if (result > 0) {
      res.json({ message: "success" });
      return;
    }
    res.json({ message: "false" });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
