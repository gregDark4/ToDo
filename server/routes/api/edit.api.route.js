const router = require("express").Router();
const { Todo } = require("../../db/models");

// router.put("/:todoId", async (req, res) => {
//   try {
//     const { todoId } = req.params;
//     const { title, description } = req.body;
//     const [result] = await Todo.update(
//       { title, description },
//       { where: { id: todoId, user_id: req.session.user_id } }
//     );
//     if (result > 0) {
//       res.json({ message: "success" });
//       return;
//     }
//     res.json({ message: "false" });
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });
router.put("/:TodoID", async (req, res) => {
  try {
    const { TodoID } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findOne({
      where: { id: TodoID },
    });
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.save();
      res.status(200).json(todo);
    } else {
      res.status(400).json({ message: "Заполните все поля" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = router;
