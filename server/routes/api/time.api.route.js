const router = require("express").Router();
const { Todo } = require("../../db/models");

router.put("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { isData } = req.body;
    console.log(req.body);
    const [result] = await Todo.update(
      { isData },
      { where: { id: todoId, user_id: req.session.user_id } }
    );
    console.log([result]);
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
