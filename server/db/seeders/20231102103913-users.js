const bcrypt = require("bcrypt");
const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: "ivan@gm.com",
        password: await bcrypt.hash("123", 10),
      },
      {
        email: "maks@gm.com",
        password: await bcrypt.hash("123", 10),
      },
      {
        email: "sasha52@gm.com",
        password: await bcrypt.hash("123", 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ onDelete: "cascade" });
  },
};
