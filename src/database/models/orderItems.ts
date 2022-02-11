"use strict";
module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define(
        "OrderItems", {
          id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          programStepId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'ProgramSteps',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          orderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Orders',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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

    OrderItems.associate = function(models) {   
    };

   
    return OrderItems;
};