const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.post("/sign-up", async (req, res) => {
  let user;
  try {
    const { email, password } = req.body;
    if (email.trim() && password.trim()) {
      user = await User.findOne({ where: { email } });
      if (!user) {
        const hash = await bcrypt.hash(password, 10);
        user = await User.create({
          email,
          password: hash,
        });
        req.session.user_id = user.id;
      }
      res.json({ message: "success", user });
    } else {
      res.json({ message: "Заполните все поля" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get("/logout", (req, res) => {
  // удаление сессии на сервере
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: "Ошибка при удалении сессии" });
    }
    res
      .clearCookie("user_sid") // серверное удаление куки по имени
      .json({ message: "success" });
  });
});

router.post("/sign-in", async (req, res) => {
  let user;
  try {
    const { email, password } = req.body;
    if (email.trim() && password.trim()) {
      user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user_id = user.id;
        res.json({ message: "success", user });
      } else {
        res.json({ message: "Неправильный логин или пароль" });
      }
    } else {
      res.json({ message: "Заполните все поля" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get("/check", async (req, res) => {
  try {
    if (req.session?.user_id) {
      const userId = req.session.user_id;
      const user = await User.findOne({
        where: { id: userId },
      });
      if (user.id === userId) {
        res.json(user);
      } else {
        res.status(403).json({ message: "Доступ запрещен" });
      }
    } else {
      res.status(401).json({ message: "Пользователь не авторизован" });
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
