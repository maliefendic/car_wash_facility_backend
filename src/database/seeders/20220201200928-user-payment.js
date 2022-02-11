"use strict";

const { updateExpressionWithTypeArguments } = require("typescript");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "UserPaymentMethods",

      [
        {
          
          paymentMethodId: 1,
          userId: 2,
          credit:100,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
        
          paymentMethodId: 2,
          userId: 2,
          credit:100,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
        
          paymentMethodId: 3,
          userId: 2,
          credit:100,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
        
          paymentMethodId: 4,
          userId: 2,
          credit:100,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
