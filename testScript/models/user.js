"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Epresence, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nama: DataTypes.STRING,
      npp: DataTypes.STRING,
      npp_supervisor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      // freezeTableName: true,
    }
  );

  User.beforeSave((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });

  User.prototype.validatePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return cb(err);

      cb(null, isMatch);
    });
  };

  return User;
};
