'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user' // Optional alias
      });

      // Optional association for the shared account (belongs to another user)
      Account.belongsTo(models.User, {
        foreignKey: 'sharedWithId',
        as: 'sharedWith' // Optional alias for the secondary user
      });
    }
  }

  // Define model fields including the new sharedWithId field
  Account.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    currency: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    sharedWithId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });

  return Account;
};