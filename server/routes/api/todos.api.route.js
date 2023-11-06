const router = require("express").Router();
const { Todo } = require("../../db/models");

router.get("/", async (req, res) => {
  const todos = await Todo.findAll();
  // {where: { user_id: req.session.user_id }})
  res.json(todos);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, isData } = req.body;
    console.log(req.body);
    if (title && description) {
      const todo = await Todo.create({
        title,
        description,
        status,
        level_id: 1,
        user_id: req.session.user_id,
        isData,
      });
      res.json(todo);
    } else {
      res.json({ message: "Заполните все поля" });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const [result] = await Todo.update(
      { status },
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
