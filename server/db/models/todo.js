const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  Todo.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
