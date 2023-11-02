const { Level } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Level.bulkCreate([
      {
        level: "1",
        todo_id: 1,
      },
      {
        level: "2",
        todo_id: 2,
      },
      {
        level: "3",
        todo_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Level.destroy({ onDelete: "cascade" });
  },
};
