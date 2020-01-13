const {
  Sequelize
} = require("sequelize");
const sequelize = new Sequelize(require("../../config/database"));

module.exports = () => {
  const user = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 100]
      }
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },
    email: {
      type: Sequelize.STRING(355),
      allowNull: false,
      unique: true
    },
    permissions: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.DATE
    }
  });

  return user;
};