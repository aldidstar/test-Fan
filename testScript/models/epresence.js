"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Epresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Epresence.belongsTo(models.User, {
        as: "User",
        // through: models.User_Epresence,
        foreignKey: "userId",
      });
    }
  }
  Epresence.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      is_approve: DataTypes.BOOLEAN,
      waktu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Epresence",
      freezeTableName: true,
    }
  );

  return Epresence;
};
