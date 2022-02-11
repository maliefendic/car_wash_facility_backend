"use strict";
module.exports = (sequelize, Sequelize) => {
  const Transactions = sequelize.define("Transactions", {
    id : {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userPaymentMethodsId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "UserPaymentMethods",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  Transactions.associate = function (models) {
    Transactions.belongsTo(models.UserPaymentMethods, {as:"transaction", foreignKey: 'userPaymentMethodsId' })
  };

  return Transactions;
};
