const router = require("express").Router();
const { Todo } = require("../../db/models");

router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      user_id: req.session.user_id,
    });
    res.json(todo);
    console.log(todo);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const [result] = await Todo.update({ status }, { where: { id: todoId } });
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
