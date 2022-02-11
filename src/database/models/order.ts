"use strict";
module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define(
        "Orders", {
          id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          discount: {
            type: Sequelize.INTEGER
          },
          total: {
            type: Sequelize.FLOAT
          },
          programId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "Programs",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          status: {
            type: Sequelize.ENUM("Paid", "NotPaid"),
            allowNull: false
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

    Orders.associate = function(models) {
    };

   
    return Orders;
};