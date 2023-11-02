const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate({ Todo }) {
      this.hasMany(Todo, { foreignKey: "level_id" });
    }
  }
  Level.init(
    {
      level: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      todo_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Level",
    }
  );
  return Level;
};
