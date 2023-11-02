const { Todo } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Todo.bulkCreate([
      {
        title: "Создать бота",
        description: "Распределить задачи для разработчика",
        status: "true",
        user_id: 1,
      },
      {
        title: "Сходить в магазин",
        description: "Прикупить муки мощного сорта",
        status: "true",
        user_id: 2,
      },
      {
        title: "Открыть дверь курьеру",
        description: "Доставка кухни",
        status: "true",
        user_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Todo.destroy({ onDelete: "cascade" });
  },
};
