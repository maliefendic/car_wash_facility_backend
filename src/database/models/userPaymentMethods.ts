"use strict";
module.exports = (sequelize, Sequelize) => {
  const UserPaymentMethods = sequelize.define("UserPaymentMethods", {
    id : {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    paymentMethodId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "PaymentMethods",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    credit:{
      type: Sequelize.INTEGER,
      min:0,
      defaultValue:100  
     },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  UserPaymentMethods.associate = function (models) {
    UserPaymentMethods.hasMany(models.Transactions,{ foreignKey: 'userPaymentMethodsId'})
  };

  return UserPaymentMethods;
};
