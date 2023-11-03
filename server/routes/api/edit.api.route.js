const router = require('express').Router();
const { Todo } = require('../../db/models');

router.put('/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description } = req.body;
    const [result] = await Todo.update(
      { title, description },
      { where: { id: todoId } }
    );
    if (result > 0) {
      res.json({ message: 'success' });
      return;
    }
    res.json({ message: 'false' });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
