const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Todo }) {
      this.hasMany(Todo, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
